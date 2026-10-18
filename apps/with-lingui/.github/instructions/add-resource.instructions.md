---
applyTo: "src/api/**/*.ts,src/mocks/**/*.ts,src/routes/_auth/**/*.tsx,e2e/**/*.spec.ts"
description: "Use when adding a new CRUD resource (roles, tenants, etc.). Keywords: add resource, new resource, scaffold, CRUD page."
---

# Add Resource Recipe

Add a list CRUD flow in `apps/with-lingui` that mirrors **Users** (TanStack Router + Query + MSW + Lingui). There is **no** codegen script: **copy and adapt by hand** using the steps below, or have an Agent follow this checklist. Primary references: `src/routes/_auth/users/` and the matching `e2e/*.spec.ts` files.

## 0. Verification commands (after your changes)

```bash
cd apps/with-lingui
pnpm run build             # refresh TanStack routeTree when routes change
pnpm exec vp check --no-fmt
pnpm run test:e2e -- e2e/<slug>.spec.ts
```

## 1. Zod and types (`src/api/schemas.ts`)

- Define `<Entity>Schema`, `Create<Entity>RequestSchema`, `Update<Entity>RequestSchema` (`Update` = `Create.partial()`).
- For list `output`, reuse `PaginatedDataSchema(<Entity>Schema)` (unwrapped `data`; envelope stays in `request.ts`).
- Add list query schema (e.g. `List<Entity>QuerySchema`) when the table has filters/pagination.
- Export `type <Entity> = z.infer<typeof ...>`.

## 2. Resource API module (`src/api/<slug>.ts`)

- Export path constants if useful for MSW/docs.
- Define APIs with `defineApi` from `@/api/request`: `list` / `create` / `update` / `delete` (and `queryKeys`).
- `method` defaults to `GET`; mutations set `POST` / `PUT` / `DELETE`.
- Use segmented `params` / `query` / `body` + `output`; do not call axios from routes.

## 3. Mock data (`src/mocks/data.ts`)

- Append a `MOCK_<ENTITIES>` array. For **admin** users, `permissions` must include `<slug>:view` (and create/edit/delete if you add writes), aligned with `GET /api/auth/permissions`.

## 4. MSW (`src/mocks/handlers/<slug>.ts` + `handlers/index.ts`)

- Follow `handlers/user.ts`: paginated `GET` + optional `keyword`, `POST` / `PUT` / `DELETE`; use `successWithSchema` / `paginatedWithSchema` / `successWithNullBody` for success and `errorResponse` for errors.
- Register `...<slug>Handlers` in `handlers/index.ts`.

## 5. Route page (`src/routes/_auth/<slug>/`)

- `createFileRoute("/_auth/<slug>/")`, wiring `useResourceCRUD` with resource functions (`listX`, `createX`, …) and `queryKeys` from `@/api/<slug>` (recommended: `optimistic: { update: true, delete: true }`), plus `useCrudToasts`, `useUrlSearchState`, `useTableFitHeight` (see `users/` for splitting `-Toolbar` / `-FormModal`).
- **Lingui**: run `pnpm run i18n:extract && pnpm run i18n:compile` for new copy (or `vp exec lingui …`).

## 6. Menu and permissions (`src/utils/appMenu.ts`)

- Add a menu entry to `APP_MENU_TREE`: `path: "/<slug>"`, `permissions: ["<slug>:view"]`, `icon` using a Sidebar-registered key (see existing `IconLucide*` entries in `Sidebar`).
- Keep behavior consistent with `canAccessPath` / 403.

## 6b. Sidebar labels and icons (`src/components/Layout/Sidebar/index.tsx`)

- In `MENU_LABELS`, add a Lingui `msg` entry for the menu item `name` (must match the `name` string from `appMenu`).
- In `MENU_ICON_MAP`, map the new `icon` key to a `lucide-react` icon and add the matching `import`.
- Then run `pnpm run i18n:extract && pnpm run i18n:compile` and fill in `zh` (and other locale) translations.

## 7. E2E (`e2e/<slug>.spec.ts`)

- Copy structure from `users.spec.ts`: `loginAsAdmin` → `goto /<slug>`, assert headers / search placeholder, etc.

## 8. Verification

- `pnpm exec vp check --no-fmt`
- `pnpm run test:e2e:core` (if you add the new spec to core) or `pnpm exec playwright test e2e/<slug>.spec.ts`
- `pnpm run build` and watch chunk sizes in the log

## Notes

- Before adding or renaming files, confirm nothing already exists at that path so you do not overwrite hand-written code.
- After manual schema edits, treat the diff as source of truth; there is no automatic merge.
