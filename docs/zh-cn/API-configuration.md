# 接口配置

本项目使用基于 TypeScript 的按功能分割服务模块，位于 `src/services/`，所有服务通过共享的 HTTP 封装 `src/utils/request.ts`（默认导出为 `api` 函数）发起请求。

为什么采用此模式？
- 每个领域（user/admin/menu/dashboard）有独立函数，职责清晰。
- 使用 TypeScript 提供输入/输出类型定义，便于维护（参见 `src/types`）。
- 请求处理集中化（查询参数、JSON body、鉴权 header、统一响应格式等）在 `src/utils/request.ts`。

示例（来自 `src/services/user.ts`）：

```ts
import type { PagedResponse, User } from '@/types/user';
import api from '../utils/request';

export async function listUsers(
  params?: Record<string, string | number | boolean>,
): Promise<PagedResponse<User>> {
  return api<PagedResponse<User>>('/users', { method: 'GET', params });
}

export async function createUser(values: Record<string, unknown>): Promise<User> {
  return api('/user', { method: 'POST', body: values });
}
```

使用方式：
- 通过 `import { listUsers } from '@/services/user'` 导入命名函数。
- `api(path, options)` 返回后端约定格式 `{ success, message, data }` 中的 `data` 字段。

关于 `src/utils/request.ts`：
- 会将 `config.apiPrefix` 与 `path` 拼接；支持 `params`（查询）、`body`（JSON 或 FormData）；若存在本地 token 则自动注入 `Authorization`。
- 对非成功响应会抛出异常并在界面上显示消息（使用 `antd` 的 `message`）。

如果你在迁移旧的 API 映射实现，建议按当前结构将功能拆分为小型服务模块并补充类型定义。