# HTTP 请求

本项目使用位于 `src/utils/request.ts` 的轻量封装（基于 `fetch`），默认导出为 `api`。该封装负责：

- 将 `config.apiPrefix` 与请求 `path` 拼接为最终 URL。
- 处理 `params`（查询字符串）与 `body`（JSON 或 FormData）。
- 在本地有 token 时自动注入 `Authorization` 头（本项目使用 localStorage 键 `app-auth-token`）。
- 统一解析后端返回（后端需遵循 `{ success, message, data }` 约定）并在非成功时抛出错误并显示 UI 提示（使用 `antd` 的 `message`）。

主要行为说明

- `api(path, options)` 会把 `config.apiPrefix` 与 `path` 拼接。
- 当传入 `options.params` 时，会序列化为查询字符串并追加到 URL。
- `options.body` 的处理策略：
  - 若为 FormData，直接发送（不要手动设置 Content-Type）。
  - 若为字符串或 Blob，直接发送。
  - 其余对象会被 `JSON.stringify`，默认设置 `Content-Type: application/json`（除非已在 headers 中指定）。
- 若 localStorage 中有 token 且未在 headers 中显式提供 Authorization，将自动设置 `Authorization: Bearer <token>`。
- 成功响应返回后端 `data` 字段；响应格式不符合约定或后端返回失败时会抛出异常。

使用示例（TypeScript）：

```ts
import api from '@/utils/request';

// 带查询参数的 GET
const page = await api('/users', { method: 'GET', params: { page: 1, pageSize: 10 } });

// 发送 JSON 请求体的 POST
const created = await api('/user', { method: 'POST', body: { name: 'Alice' } });
```

详细实现请参阅 `src/utils/request.ts`，文档中仅列出使用建议与约定。