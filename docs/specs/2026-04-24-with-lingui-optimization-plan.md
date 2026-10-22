# apps/with-lingui 模板优化计划

> 状态：已部分落地（更新于 2026-04-27）
> 计划日期：2026-04-24
> 范围：以 `apps/with-lingui` 为主模板（`apps/basic` 为英文、无 Lingui 的对照应用；**CRUD 页面级示例仅以 `users` 为样板**，不设第二示例资源）
> 面向：人类贡献者 + AI Agent（**现行**：各 app 的 `AGENTS.md` + `.agents/skills/`；下文若提及 `.github/instructions/*.instructions.md` 为历史方案）

## 0. 背景

`apps/with-lingui` 作为仓库主模板，技术栈（React 19 / AntD 6 / TanStack Router & Query / Zod v4 / Lingui / MSW 2 / Vite+）已属第一梯队，AI 友好度（scoped instructions + 分包策略）领先同类开源 admin 模板。本计划聚焦**下一轮可见收益**，把页面级样板下沉到 hook/工具链，把 AI 指令从"规范"升级为"可执行食谱"。

详细评价参见内部讨论记录，本文只列执行项。

## 1. 目标与非目标

### 目标

- **安全性**：闭合 JWT 刷新流、移除 store/http 跨层耦合。
- **可维护性**：将 `routes/_auth/users/index.tsx`（491 行）中的通用能力下沉为 hook，使新增资源页 <200 行、<30 分钟。
- **可观测性**：RBAC / URL 状态等进入核心 E2E；体积以 `vp build` 日志与 Code review 把关（**不**在 CI 中跑自动化 bundle 上限工具）。
- **AI 协作**：补齐"加资源食谱"与 Cursor 规则镜像；**不**提供 codegen 脚本，以 `**add-resource.instructions.md`** 为唯一执行清单（对照 `users`）。

### 非目标

- 不替换现有技术栈（Vite+ / Lingui / AntD 6 / TanStack 保持不变）。
- `**apps/basic` 与主模板同步**：以工程模式对齐为主（HTTP、hooks、E2E 等），不要求为演示而维护两套 CRUD 样板页。
- 不引入新的 UI 或样式库（遵循 `frontend.instructions.md`）。

## 2. 执行项（按优先级）

### P0：正确性与启动性能

- **P0-1 解耦 http ↔ auth store**
  - 现状：`apps/with-lingui/src/utils/http.ts` L35–46 直接 `localStorage.getItem("auth-storage")` 再 `JSON.parse`，与 `stores/auth.ts` 的 `partialize` 结构强耦合。
  - 方案：
    - 在 `stores/auth.ts` 导出 `getAccessToken()` / `getTokens()` 工具。
    - `http.ts` 改为 `import { getAccessToken } from "@/stores/auth"`。
    - `getAuthHeaders()` 保留但内部改调用工具。
  - 验收：`vp check --no-fmt` + 登录 E2E 通过；搜索仓库不再出现 `"auth-storage"` 字面量（除 store 自身）。
- **P0-2 实现 401/403 拦截与 refresh token 流**
  - 现状：`AuthTokensSchema` 已含 `refreshToken`，但 `request()` 未使用；403 由各页面自行处理。
  - 方案：
    - `utils/http.ts` 拦截 401：调 `POST /api/auth/refresh`（新增端点常量 + schema + MSW handler），并发去重（`inflightRefresh: Promise | null`），成功后回放原请求。
    - 拦截 403：通过 `@tanstack/react-router` 的 `router.navigate({ to: "/403" })`；为此导出一个可注入 `router` 的 `installHttpInterceptors(router)`，在 `main.tsx` 调用。
    - 刷新失败 → `useAuthStore.getState().logout()` + 导向 `/login`。
  - 新增文件：
    - `src/api/auth.ts` 增加 `REFRESH` 常量。
    - `src/mocks/handlers/auth.ts` 增加 refresh handler（含错误分支模拟）。
  - 验收：新增 E2E `e2e/auth-refresh.spec.ts` 覆盖：过期 access token → 自动刷新 → 请求成功；刷新失败 → 登出并跳登录。
- **P0-3 启动链并行化**
  - 现状：`src/main.tsx` L26–49 串行 5 步：`enableMocking → rehydrate settings → loadLocale → rehydrate auth → fetchSession → render`。
  - 方案：
    - `loadLocaleCatalog` 与 `useAuthStore.persist.rehydrate()` 并行（`Promise.all`）。
    - `fetchSessionAndApplyToStore()` 从 `main.tsx` 移除，改到 `routes/_auth.tsx` 的 `beforeLoad` 内按需触发（路由守卫已经会校验 `isAuthenticated`）。
    - 保留渲染前仅做"i18n 激活 + 主题 hydrate"两个硬依赖。
  - 验收：本地 DevTools Performance 首屏 TTI 改善 ≥ 150ms；刷新已登录页仍能正确拉取 session。

### P1：架构清晰度

- **P1-1 抽出 `useTableFitHeight` hook**
  - 现状：`routes/_auth/users/index.tsx` L291–384 约 90 行 DOM 测量（`ResizeObserver` + rAF 重试 + 主布局 `clipBottom` 计算）写在页面内。
  - 方案：
    - 新文件 `src/hooks/useTableFitHeight.ts`，输入 `{ pageShellRef, toolbarRef, middleRef, tableFrameRef, deps }`，返回 `{ tableAreaMaxHeight, tableScrollY, lockScrollHeight }`。
    - 页面只保留 ref 声明与调用。
  - 验收：`users/index.tsx` 行数 < 260；暗色 / 不同分辨率下无双滚动条（以核心 E2E + 人工回归为准）。
- **P1-2 抽出 `useCrudToasts` hook**
  - 现状：`users/index.tsx` L101–161 每个资源都要写 ~60 行 create/update/delete lifecycle toasts。
  - 方案：
    - 新文件 `src/hooks/useCrudToasts.ts`，接收 `{ resourceLabel: () => string }`（配合 Lingui macro），内部返回 `createLifecycle / updateLifecycle / deleteLifecycle` 三个对象，可直接传入 `useResourceCRUD`。
    - 文案用 Lingui macro；允许覆盖单条文案。
  - 验收：`users/index.tsx` 中不再出现 `MESSAGE_KEY_USER_`* 常量与裸 `t\`... successfully` 重复；至少一个新资源页引用并通过 E2E。
- **P1-3 抽出 `useUrlSearchState` hook**
  - 现状：`users/index.tsx` 手写 `keywordInput` 本地态与 `search.keyword` 同步 + `applySearch`。
  - 方案：
    - 新文件 `src/hooks/useUrlSearchState.ts`，基于 `useNavigate` + `Route.useSearch()`，接收 zod schema，返回 `{ search, patch, keyword, setKeyword, commitKeyword }`。
    - `users/index.tsx` 与未来资源页共享。
  - 验收：`users.spec.ts` 新增"刷新保留分页/关键词/排序"用例通过。
- **P1-4 `useResourceCRUD` 人因优化**
  - 现状：`src/hooks/useResourceCRUD.ts` 调用方需手写三个泛型 + `queryKey` 与 `invalidateKey` 两次。
  - 方案：
    - `invalidateKey` 默认取 `queryKey[0]`。
    - 导出 `CrudResult<T>` 类型别名。
    - 可选 `optimistic: { update?: boolean; delete?: boolean }`，内部 `onMutate` 里做乐观 `setQueryData`；失败自动回滚。
  - 验收：用户列表删除 / 编辑在慢网（Playwright `route` 延时）下立即反馈；回滚路径有单测覆盖。
  - **落地**：`optimistic: { update, delete }` + `cancelQueries` / 失败时 `setQueryData` 恢复快照；`pnpm run test:unit`（`src/hooks/useResourceCRUD.test.ts`）覆盖 merge/delete 与 rollback 契约；`users` 列表已开启乐观更新。
- **P1-5 MSW handler 端也跑一次 schema 解析**
  - 现状：mock 与契约漂移只能在前端 `Zod.parse` 抛错时发现，堆栈离源头远。
  - 方案：
    - `src/mocks/createHandler.ts`：`successWithSchema`；`paginatedListSchema` + `paginatedWithSchema(itemSchema, payload)`；`successWithNullBody` 用于 `data: null` 响应。
    - `handlers/auth.ts`、`handlers/user.ts` 等全部经 schema 出包；新增 handler 须沿用同一模式。
  - 验收：故意改错 mock 字段名，dev 控制台首条报错来自 mock 层；`vp test` 下 handler 单元测试覆盖。
  - **落地**：`src/mocks/createHandler.test.ts`（`pnpm run test:unit`）覆盖 `successWithSchema` / `paginatedWithSchema` / `successWithNullBody` 的校验与 Zod 抛错路径。

### P2：体验与工程化

- **P2-1 统一错误兜底**
  - 根路由 `__root.tsx` 追加 `errorComponent`；`QueryClient.defaultOptions.mutations.onError` 挂接全局 `App.useApp().message.error`。
  - 全站 `message/modal/notification` 统一使用 `App.useApp()`（禁止静态方法），通过 oxlint 规则（或 code review checklist）约束。
- **P2-2 品牌 token 化**
  - 在 `src/hooks/tokenBuilders.ts` 定义 `BRAND_TOKENS`（primary、link、info、success 等），深浅色分别给一份；替换默认 AntD 蓝。
  - 允许通过 `VITE_BRAND_PRIMARY` 环境变量覆盖，便于二次分发。
- **P2-3 Bundle 体积（已决议：不再采用自动化 CI 预算）**
  - **不再采用** `size-limit` / `@size-limit/file`（及同类在 CI 中卡阈值的方案）；已从 `apps/with-lingui` 与 `with-lingui` workflow 移除。
  - 仍通过 `**manualChunks` + `vp build` 输出** 观察各 chunk；重大依赖或分片变更在 PR 描述中注明体积影响即可。
  - `refactor.instructions.md` 仅保留「分包与避免无谓大依赖」的叙述性建议，不写死 CI 阈值命令。
- **P2-4 i18n 预热**
  - `__root.tsx` 在 `requestIdleCallback` 内预拉另一语言 catalog；切换瞬时完成。
  - `document.documentElement` 预留 `dir` 属性钩子，为未来 RTL 留接口（不实现 RTL 样式）。

### P3：AI 友好度放大

- **P3-1 新增"加资源"食谱**
  - 新文件 `apps/with-lingui/.github/instructions/add-resource.instructions.md`（英文正文），front-matter 指定触发关键词（add resource / CRUD / scaffold 等）。
  - 内容为 6 步 checklist + 每步文件路径 + 验证命令，示例见下方"附录 A"。
- **P3-2 Cursor 薄规则（方案 A）**
  - 细则**单源**：`apps/with-lingui/.github/instructions/*.instructions.md`。
  - 仓库根 `.cursor/rules/with-lingui-*.mdc` 五份：仅 `description` + `globs` + 指向上述路径；**不**重复粘贴长文；`.gitignore` 放行 `.cursor/rules/` 以便进库。
  - `apps/with-lingui/README.md` 与 `instructions/README.md` 说明用法（必要时 `@` 引用 `.instructions.md`）。
- **P3-3 加资源（无脚本 codegen）**
  - **实现形态**：仅 `add-resource.instructions.md` 食谱 + `users` 示例；由贡献者或 Agent 按步骤手工落地。
  - 产出与原先 codegen 相当：`api/<name>.ts`、`schemas` 片段、mock、路由、`e2e`、菜单等。
  - 验收：按食谱新增一资源后 `pnpm exec vp check --no-fmt && pnpm test:e2e:core` 通过（可将新 spec 纳入 core 或单跑）。

## 3. 落地节奏


| 阶段       | 包含项                              | 预期工时  |
| -------- | -------------------------------- | ----- |
| Sprint 1 | P0-1 / P0-2 / P0-3 / P1-1        | 2–3 天 |
| Sprint 2 | P1-2 / P1-3 / P1-4 / P1-5 / P3-1 | 2 天   |
| Sprint 3 | P2-1 ~ P2-4 + P3-2 + P3-3（食谱）    | 2 天   |
| Sprint 4 | （预留）抽象稳定后再评估 `apps/basic` 与其它增强项 | 待定    |


每 Sprint 结束：`vp check --no-fmt && pnpm run test:e2e:core && pnpm run build`（在 `apps/with-lingui` 下），并关注构建日志中的 chunk 体积。

## 4. 风险与对策


| 风险                                     | 影响    | 对策                                                           |
| -------------------------------------- | ----- | ------------------------------------------------------------ |
| refresh token 并发去重实现错误，风暴请求            | 线上故障  | 用 `inflightRefresh`（单 Promise）串行化刷新，避免并发风暴                   |
| 乐观更新回滚遗漏                               | 数据不一致 | `useResourceCRUD` 回滚路径单测覆盖（`optimistic: true` 下 4xx 用例）      |
| 手工加资源时覆盖已有文件                           | 代码丢失  | 改前 grep / diff；食谱「注意」节强调不覆盖手写代码                              |
| `apps/basic` 与 `apps/with-lingui` 抽象漂移 | 双倍维护  | 两应用共享同一套 hook/HTTP/MSW 模式时尽量同构；Lingui 与文案差异保留在 with-lingui 侧 |


## 5. 验收标准总览

- `vp check --no-fmt` 全绿
- `pnpm test:e2e:core`（login / users / auth-refresh / rbac / url-state 等，以 `package.json` 脚本为准）全绿
- CI 含 `vp build`；bundle 不设自动化上限门禁（见 P2-3）
- `routes/_auth/users/index.tsx` 行数 ≤ 260
- 按 `add-resource.instructions.md` 能在约 30 分钟内产出可用 CRUD 页面（熟练后）

---

## 附录 A：`add-resource.instructions.md` 草稿

> **以仓库内正式文件为准**：`apps/with-lingui/.github/instructions/add-resource.instructions.md`；下文仅作计划期摘要。

```md
---
applyTo: "src/api/**/*.ts,src/mocks/handlers/**/*.ts,src/routes/_auth/**/*.tsx"
description: "Use when adding a new CRUD resource (roles, tenants, etc.). Keywords: add resource, new resource, scaffold, CRUD page, 新资源."
---

# Add Resource Recipe

## Steps

1. `src/api/schemas.ts` — Add `<Name>Schema`, `Create<Name>RequestSchema`, `Update<Name>RequestSchema`. Reuse `PaginatedResponseSchema`.
2. `src/api/<name>.ts` — Export `<NAME>_ENDPOINTS = { list, create, update: (id) => ..., delete: (id) => ... }`.
3. `src/mocks/data.ts` — Append seed data.
4. `src/mocks/handlers/<name>.ts` — Mirror `handlers/user.ts`; wrap responses with `successWithSchema`.
5. `src/mocks/handlers/index.ts` — Register the new handlers array.
6. `src/routes/_auth/<name>/index.tsx` — Duplicate `users/index.tsx`, replace types, compose `useResourceCRUD + useCrudToasts + useUrlSearchState + useTableFitHeight`.
7. `e2e/<name>.spec.ts` — Copy `users.spec.ts`, adjust selectors.

## Validation

- `vp check --no-fmt`
- `pnpm test:e2e -- --grep <name>`
- `vp build` 后对照构建日志关注主 chunk / vendor 体积（无 CI 硬阈值）
```

## 附录 B：文件改动预估


| 文件                                                                   | 类型                       |
| -------------------------------------------------------------------- | ------------------------ |
| `apps/with-lingui/src/utils/http.ts`                                 | 重构                       |
| `apps/with-lingui/src/stores/auth.ts`                                | 增加导出                     |
| `apps/with-lingui/src/main.tsx`                                      | 简化                       |
| `apps/with-lingui/src/routes/_auth.tsx`                              | 新增 `beforeLoad`          |
| `apps/with-lingui/src/hooks/useTableFitHeight.ts`                    | 新增                       |
| `apps/with-lingui/src/hooks/useCrudToasts.ts`                        | 新增                       |
| `apps/with-lingui/src/hooks/useUrlSearchState.ts`                    | 新增                       |
| `apps/with-lingui/src/hooks/useResourceCRUD.ts`                      | 增强                       |
| `apps/with-lingui/src/mocks/createHandler.ts`                        | 增强                       |
| `apps/with-lingui/src/mocks/handlers/auth.ts`                        | 补 refresh                |
| `apps/with-lingui/src/routes/_auth/users/index.tsx`                  | 大幅精简                     |
| `apps/with-lingui/.github/instructions/add-resource.instructions.md` | 新增                       |
| `.cursor/rules/*.mdc`                                                | 新增（5 份镜像）                |
| `e2e/{auth-refresh,rbac,url-state,...}.spec.ts`                      | 新增 / 演进                  |
| `.github/workflows/with-lingui-ci.yml`                               | 质量 + build（无 size-limit） |


