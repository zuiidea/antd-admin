# Antd Admin

Balanced admin scaffold: i18n (Lingui), MSW mocks, minimal RBAC, full CRUD, and Playwright E2E — built with React 19, Ant Design 6, and Vite+. AI-friendly with clear patterns, shared abstractions, scoped AI instructions, and type-safe contracts at every boundary.

**AI rules (Cursor):** `.cursor/rules/with-lingui-*.mdc` at the repo root mirrors `apps/with-lingui/.github/instructions/*.instructions.md` (same intent; `globs` align with each file’s `applyTo`). Prefer updating **both** when you change guidance.

[antd](https://github.com/ant-design/ant-design)
[react](https://react.dev)
[vite](https://viteplus.dev)
[TypeScript](https://www.typescriptlang.org/)
[GitHub issues](https://github.com/zuiidea/antd-admin/issues)
[GitHub stars](https://github.com/zuiidea/antd-admin/stargazers)
[License](http://opensource.org/licenses/MIT)
[PRs Welcome](https://github.com/zuiidea/antd-admin/pulls)

## Tech Stack

| Category     | Technology                                                             |
| ------------ | ---------------------------------------------------------------------- |
| Build Tool   | [Vite+](https://viteplus.dev) (VoidZero unified toolchain)             |
| UI Framework | [Ant Design 6.x](https://ant.design)                                   |
| Routing      | [TanStack Router](https://tanstack.com/router) (file-based, type-safe) |
| Async State  | [TanStack Query v5](https://tanstack.com/query)                        |
| Local State  | [Zustand](https://zustand.docs.pmnd.rs) (persisted auth & settings)    |
| Validation   | [Zod v4](https://zod.dev) (schemas, API contracts, form validation)    |
| i18n         | [LinguiJS](https://lingui.dev) (en + zh catalogs)                      |
| Icons        | [lucide-react](https://lucide.dev/guide/packages/lucide-react)         |
| API Mocking  | [MSW 2.x](https://mswjs.io) (Service Worker based)                     |
| E2E Testing  | [Playwright](https://playwright.dev)                                   |
| Language     | TypeScript 5.9 (strict mode)                                           |

## Features

- **JWT Authentication** — Login with access/refresh token flow, persisted via Zustand
- **Dynamic Menu & RBAC** — Backend-driven sidebar menu with permission guards and 403 page
- **URL-First State** — Table search params (page, pageSize, keyword, sort) synced to URL
- **i18n** — LinguiJS with English (`en`) and Chinese (`zh`); Ant Design locales wired in root
- **Dark Mode** — One-click toggle with Ant Design theme algorithm
- **Full Type Safety** — Zod schemas validate API boundaries at runtime where used
- **Zero-Config Mocking** — MSW intercepts API calls in development, no backend needed

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) >= 20
- [Vite+](https://viteplus.dev/guide/) CLI (`vp`)

### Install & Run

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) — you'll be redirected to the login page.

**Default credentials:** `admin` / `admin`

### Build

```bash
pnpm run build
pnpm run preview
```

### Project Setup

```bash
pnpm run prepare
```

### Code Quality

```bash
pnpm run fmt
pnpm run lint
pnpm run check
```

### Unit Tests

```bash
pnpm run test:unit
```

### E2E Tests

```bash
pnpm run test:e2e
pnpm run test:e2e:core
pnpm run test:e2e:ui   # interactive UI mode
```

### Lingui Scripts

```bash
# extract messages from source to .po catalogs
vp exec lingui extract -- --clean

# compile catalogs to runtime messages
vp exec lingui compile

# CI-oriented check: extract + ensure no pending locale diff
pnpm run i18n:extract && git diff --exit-code -- src/locales
```

## Project Structure

```
.github/instructions/          # Scoped AI guidance (frontend/testing/api/refactor/add-resource)
src/
├── api/                       # Zod models + endpoint contracts
├── components/                # Reusable UI primitives and layout shells
│   ├── Layout/                # MainLayout, Header, Sidebar, UserMenu, AppFooter
│   ├── DataTable/             # Shared table frame/skeleton/empty state
│   ├── FormModal/             # Generic modal form wrapper
│   ├── FilterToolbar/         # Reusable list page toolbar
│   ├── Auth/                  # Permission gate component
│   ├── Aurora/                # Login page background effect
│   ├── Icon/                  # Shared icons (GitHub, Theme, etc.)
│   ├── NotFound/              # Not-found visual component
│   └── RouteError.tsx         # Route-level error boundary UI
├── hooks/                     # Shared hooks (theme, CRUD, URL state, permissions)
│   ├── useAppTheme.ts
│   ├── usePermission.ts
│   ├── useResourceCRUD.ts
│   ├── useCrudToasts.ts
│   ├── useUrlSearchState.ts
│   ├── useTableFitHeight.ts
│   └── tokenBuilders.ts
├── locales/                   # Lingui catalogs + locale loader
│   ├── en/messages.po
│   ├── zh/messages.po
│   └── loadLocaleCatalog.ts
├── mocks/                     # MSW bootstrap, handlers, seed data, test helpers
│   ├── browser.ts
│   ├── createHandler.ts
│   ├── createHandler.test.ts
│   ├── data.ts
│   ├── utils.ts
│   └── handlers/
├── routes/                    # TanStack Router file routes
│   ├── __root.tsx             # QueryClient + ConfigProvider + I18n wiring
│   ├── _auth.tsx              # Protected route layout
│   ├── _auth/dashboard/index.tsx
│   ├── _auth/users/index.tsx
│   ├── _auth/users/-Toolbar.tsx
│   ├── _auth/users/-FormModal.tsx
│   ├── _auth/403/index.tsx
│   ├── login/index.tsx
│   ├── register/index.tsx
│   ├── 404/index.tsx
│   └── index.tsx
├── stores/                    # Persisted auth/settings stores
├── utils/                     # HTTP client, constants, session/menu helpers
├── main.tsx                   # App bootstrap (MSW init + React render)
└── routeTree.gen.ts           # Generated TanStack route tree

e2e/                           # Playwright E2E suites
├── helpers.ts
├── login.spec.ts
├── users.spec.ts
├── auth-refresh.spec.ts
├── rbac.spec.ts
└── url-state.spec.ts

```

## Internationalization (i18n)

The project uses [LinguiJS](https://lingui.dev) with compile-time macros. Locales: `**en**` (source) and `**zh**`.

### Workflow

```bash
vp run i18n:extract
vp run i18n:compile
```

Ant Design strings follow the active locale via `ConfigProvider` in `__root.tsx`.

## Extending the template

- **New CRUD resource:** See `.github/instructions/add-resource.instructions.md` (checklist; copy from `users`), then `pnpm run i18n:extract && pnpm run i18n:compile`, wire Sidebar labels/icons if needed (§6b in that doc), and `pnpm exec vp check --no-fmt`.
- **Real backend:** Point `VITE_API_BASE_URL` in env and disable or remove MSW in `main.tsx` when you no longer need mocks.
- **Drop i18n:** Remove Lingui packages, vite/swc plugins, and replace `t` macros with plain strings (larger refactor).

### AI instruction files

**Single source of truth**: `apps/with-lingui/.github/instructions/` (`*.instructions.md`). Both humans and agents should maintain and review guidance from this directory.

**Cursor**: The root `.cursor/rules/with-lingui-*.mdc` files are intentionally thin rules (Approach A), containing only scope and pointer paths. Keep `globs` aligned with each instruction file's `applyTo`; for full details, reference the target `.instructions.md` file in chat with `@` or open it directly.

## Developer Notes

- Prefer Vite+ commands for installs, checks, and scripts. This repo is configured around `vp`.
- Run `vp check --no-fmt` for type/lint validation.
- Core regression coverage lives in the login and users E2E flows.

## Pages

| Route        | Description                                                 |
| ------------ | ----------------------------------------------------------- |
| `/login`     | Login form with validation                                  |
| `/dashboard` | Statistics overview cards                                   |
| `/users`     | User CRUD table with search, pagination, create/edit/delete |
| `/403`       | Forbidden error page                                        |
| `/404`       | Not found error page                                        |

## License

MIT
