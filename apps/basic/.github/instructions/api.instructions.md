---

## applyTo: "src/api/**/\*.ts,src/utils/http.ts,src/mocks/handlers/**/\*.ts,src/mocks/createHandler.ts"

description: "Use when editing API clients, schemas, HTTP behavior, response types, or MSW endpoint handlers. Keywords: api, http, schema, zod, handler, endpoint, auth, users."

# API Instructions

## Purpose

Maintain strict API contracts and consistent server/client mock behavior.

## Do

- Keep request/response shapes schema-driven and type-safe.
- Reuse endpoint constants and shared response helpers.
- Keep handler response envelope consistent (`code`, `data`, `message`).
- Ensure mock handlers reflect real API behavior and error semantics.
- Keep naming stable for endpoint keys and mutation/query keys.

## Do Not

- Do not return ad-hoc response shapes for one-off convenience.
- Do not bypass schema parsing in new client mutations/queries.
- Do not mix unrelated domain endpoints in the same module.

## Validation

- Verify TypeScript and schema parsing paths compile cleanly.
- Run: `vp check --no-fmt`
