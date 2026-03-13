<p align="center">
  <a href="http://github.com/zuiidea/antd-admin">
    <img alt="antd-admin" height="64" src="./public/logo.svg">
  </a>
</p>

<h1 align="center">AntD Admin</h1>

<div align="center">

An excellent front-end solution for enterprise applications.

[![antd](https://img.shields.io/badge/antd-^6.0.0-blue.svg?style=flat-square)](https://github.com/ant-design/ant-design) [![umi](https://img.shields.io/badge/umi-^4.0.0-orange.svg?style=flat-square)](https://github.com/umijs/umi) [![GitHub issues](https://img.shields.io/github/issues/zuiidea/antd-admin.svg?style=flat-square)](https://github.com/zuiidea/antd-admin/issues) [![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/zuiidea/antd-admin/pulls) [![Gitter](https://img.shields.io/gitter/room/antd-admin/antd-admin.svg)](https://gitter.im/antd-admin/antd-admin)

# antd-admin_next

Lightweight admin template built with Ant Design, Umi and TypeScript. This project aims to provide a clean, extensible starting point for building admin panels. It includes common pages, sample components, and a local mock server for development.

## Key Features

- Ant Design 6 + Umi
- TypeScript-first codebase
- Local mock server (`mock/index.js`) for development
- Lightweight state with `zustand`
- Example pages: Dashboard, Users, Menu management, AI Chat demo

## Quick Start

Recommended: use pnpm.

```bash
# install dependencies
pnpm install

# local development
pnpm run dev

# build for production
pnpm run build

# lint and format
pnpm run lint
pnpm run format
```

Scripts are defined in `package.json`.

## Project Structure (summary)

- `src/`
  - `layouts/` global layout components
  - `pages/` routes and views
  - `components/` shared components
  - `services/` API wrappers
  - `store/` global state (zustand)
  - `utils/` helpers and configuration

## Development notes

- Local mock: `mock/index.js` provides mocked API endpoints during development.
- Common routes:
  - `/` or `/dashboard` — Dashboard
  - `/users` — Users list
  - `/sys/menu` — Menu management
  - `/ai/chat` — AI Chat demo

## Customization

- Update API calls in `src/services` to point to real backends.
- Reuse or extend components in `src/components` (for example `DropOption`).

## GitHub Actions CI

This repository includes a GitHub Actions workflow that installs dependencies with `pnpm`, runs lint and builds the project. The workflow is at `.github/workflows/ci.yml`.

If you want tests added to CI, add a test script to `package.json` and update the workflow accordingly.

## Contributing

Contributions welcome via issues and pull requests. Typical contributions:

- Bug fixes
- Example pages or components
- Type and lint improvements