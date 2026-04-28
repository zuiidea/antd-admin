<p align="center">
  <a href="http://github.com/zuiidea/antd-admin" target="_blank">
    <img alt="antd-admin-logo" height="80" src="./public/favicon.svg">
  </a>
</p>

<h1 align="center">Antd Admin</h1>

<div align="center">

English-only admin scaffold (no Lingui): MSW mocks, minimal RBAC, full CRUD, and Playwright E2E — built with React 19, Ant Design 6, and Vite+. For Lingui-based i18n (en + zh), use the sibling app [`apps/with-lingui`](../with-lingui/).

[![antd](https://img.shields.io/badge/AntD-^6.0.0-1890ff?style=flat-square&logo=ant-design)](https://github.com/ant-design/ant-design)
[![react](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)](https://react.dev)
[![vite](https://img.shields.io/badge/Vite+-Latest-646cff?style=flat-square&logo=vite)](https://viteplus.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![GitHub issues](https://img.shields.io/github/issues/zuiidea/antd-admin?style=flat-square)](https://github.com/zuiidea/antd-admin/issues)
[![GitHub stars](https://img.shields.io/github/stars/zuiidea/antd-admin?style=flat-square)](https://github.com/zuiidea/antd-admin/stargazers)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](http://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/zuiidea/antd-admin/pulls)

</div>

## Tech Stack

| Category     | Technology                                                             |
| ------------ | ---------------------------------------------------------------------- |
| Build Tool   | [Vite+](https://viteplus.dev) (VoidZero unified toolchain)             |
| UI Framework | [Ant Design 6.x](https://ant.design)                                   |
| Routing      | [TanStack Router](https://tanstack.com/router) (file-based, type-safe) |
| Async State  | [TanStack Query v5](https://tanstack.com/query)                        |
| Local State  | [Zustand](https://zustand.docs.pmnd.rs) (persisted auth & settings)    |
| Validation   | [Zod v4](https://zod.dev) (schemas, API contracts, form validation)    |
| UI language  | English strings in source (no i18n framework)                          |
| Icons        | [lucide-react](https://lucide.dev/guide/packages/lucide-react)         |
| API Mocking  | [MSW 2.x](https://mswjs.io) (Service Worker based)                     |
| E2E Testing  | [Playwright](https://playwright.dev)                                   |
| Language     | TypeScript 5.9 (strict mode)                                           |

## Features

- **JWT Authentication** — Login with access/refresh token flow, persisted via Zustand
- **Dynamic Menu & RBAC** — Backend-driven sidebar menu with permission guards and 403 page
- **URL-First State** — Table search params (page, pageSize, keyword, sort) synced to URL
- **English-only** — No Lingui or locale catalogs; Ant Design uses a fixed `en_US` locale. See [`apps/with-lingui`](../with-lingui/) for bilingual LinguiJS.
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

## Project Structure

```text
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
├── mocks/                     # MSW bootstrap, handlers, seed data, test helpers
│   ├── browser.ts
│   ├── createHandler.ts
│   ├── createHandler.test.ts
│   ├── data.ts
│   ├── utils.ts
│   └── handlers/
├── routes/                    # TanStack Router file routes
│   ├── __root.tsx             # QueryClient + ConfigProvider (en_US) wiring
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

## Language & i18n

This template is **English-only**: user-facing copy lives in components and routes as plain strings; there is no Lingui catalog or language switcher.

For **LinguiJS** (English + Chinese, `.po` extract/compile, and Ant Design locale switching), use [`apps/with-lingui`](../with-lingui/).

## Extending the template

- **Real backend:** Point `VITE_API_BASE_URL` in env and disable or remove MSW in `main.tsx` when you no longer need mocks.
- **Add i18n:** Start from [`apps/with-lingui`](../with-lingui/) or port Lingui setup from that app; this `basic` tree intentionally omits it.

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
