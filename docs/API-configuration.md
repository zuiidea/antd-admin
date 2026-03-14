# API configuration

This project uses explicit per-feature service modules (TypeScript) under `src/services/` that call a shared HTTP helper `src/utils/request.ts` (exported as the default `api` function).

Why this pattern?
- Clear function boundaries per domain (users, admin, menu, dashboard).
- Type-safe signatures in TypeScript for inputs/outputs (`src/types`).
- Centralized request handling (query params, JSON body, auth header, unified response format) in `src/utils/request.ts`.

Example service (from `src/services/user.ts`):

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

Usage:
- Import named functions from the service module: `import { listUsers } from '@/services/user'`.
- The helper `api(path, options)` returns the parsed `data` payload from responses that follow the `{ success, message, data }` convention.

Notes about `src/utils/request.ts`:
- Combines `config.apiPrefix` with the provided `path`.
- Supports `params` (query), `body` (JSON or FormData), and sets `Authorization` header from local storage when available.
- Throws errors and shows UI messages for non-success responses.

If you are migrating older code that used an API mapping, prefer creating small service modules with clear function names and types as shown above.