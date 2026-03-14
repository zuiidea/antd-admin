# HTTP requests

This project uses a small fetch-based HTTP helper implemented at `src/utils/request.ts` (export default `api`). The helper centralizes:

- Prefixing paths with `config.apiPrefix`.
- Handling `params` (query string) and `body` (JSON or FormData).
- Injecting an `Authorization` header from local storage when available.
- Unified response parsing and error handling (expects backend responses in the form `{ success, message, data }`).

Key behaviors

- `api(path, options)` merges `config.apiPrefix` + `path` to build the URL.
- If `options.params` is provided it's serialized and appended as query string.
- `options.body` handling:
  - FormData is sent as-is (do not set Content-Type manually).
  - Strings and Blobs are sent directly.
  - Plain objects are JSON.stringified and Content-Type defaults to `application/json`.
- If a token exists in local storage (key `app-auth-token`), the helper injects an `Authorization: Bearer <token>` header unless one is already provided.
- Responses are expected to be JSON with `{ success: boolean, message?: string, data: T }`. Non-success responses throw an Error and show a UI message (uses `antd`'s `message`).

Usage (TypeScript-friendly):

```ts
import api from '@/utils/request';

// GET with query params
const page = await api('/users', { method: 'GET', params: { page: 1, pageSize: 10 } });

// POST with JSON body
const created = await api('/user', { method: 'POST', body: { name: 'Alice' } });
```

The helper returns the `data` field from successful responses. Check `src/utils/request.ts` for exact typings and behavior.