---
applyTo: "src/api/**/*.ts,src/mocks/handlers/**/*.ts,src/mocks/createHandler.ts"
description: "Use when editing API clients, schemas, HTTP behavior, response types, or MSW endpoint handlers. Keywords: api, request, defineApi, schema, zod, handler, endpoint, auth, users."
---

# API Instructions

## Purpose

Maintain strict API contracts and a single call path: **schemas → `defineApi` resource modules → UI**. Transport lives in `src/api/request.ts` (axios + interceptors).

## Do

- Define APIs with `defineApi` in `src/api/<resource>.ts` (`method` defaults to `GET`; use `params` / `query` / `body` + `output`).
- Keep Zod schemas in `src/api/schemas.ts` as the single contract; parse inputs/outputs inside `defineApi`.
- Keep MSW handler envelopes consistent (`code`, `data`, `message`) and aligned with schemas.
- Co-locate React Query keys with resource modules (e.g. `userQueryKeys`).
- Use `hydrateSession` from `@/api/auth` after login/register or when restoring a session.

## Do Not

- Do not call `axios` or `@/api/request` transport helpers from routes/components — import resource functions only (`listUsers`, `login`, …).
- Do not return ad-hoc response shapes for one-off convenience.
- Do not bypass schema parsing in new client mutations/queries.
- Do not mix unrelated domain endpoints in the same module.

## Validation

- Verify TypeScript and schema parsing paths compile cleanly.
- Run: `vp check --no-fmt`
