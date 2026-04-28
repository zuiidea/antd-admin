# Antd Admin

## Introduction

Antd Admin provides production-style admin templates with modern frontend tooling, mock-first development, and practical testing coverage.

Available templates:

- `basic`: English-only setup
- `with-lingui`: Bilingual setup (`en` + `zh`) with Lingui

Scaffolding CLI:

- `init-antd-admin` (from `packages/create`)

## Key Features

- JWT login with access/refresh flow
- Backend-driven menu and permission guards
- URL-synced table state (pagination, sorting, search)
- Dark mode theme switching
- Mock-first local development (no backend required)
- Typed API boundaries and reusable CRUD patterns
- React 19 + Ant Design 6 + TanStack Router/Query + Zustand + Zod
- Optional Lingui-based i18n workflow (`with-lingui`)
- E2E coverage with Playwright

## Quick Start

Use `init-antd-admin` to scaffold a standalone app from official templates.

### Interactive

```bash
npx init-antd-admin@latest
pnpm dlx init-antd-admin@latest
yarn dlx init-antd-admin@latest
bunx init-antd-admin@latest
```

### Non-interactive examples

```bash
pnpm dlx init-antd-admin@latest my-app --example basic -m pnpm
pnpm dlx init-antd-admin@latest my-app --example with-lingui --skip-install
```

### Common options


| Option                       | Description                      |
| ---------------------------- | -------------------------------- |
| `[project-directory]`        | Target folder                    |
| `-e, --example <name         | url>`                            |
| `--example-path <path>`      | Subpath inside remote repository |
| `-m, --package-manager <pm>` | `npm` / `pnpm` / `yarn` / `bun`  |
| `--skip-install`             | Skip dependency install          |
| `--skip-transforms`          | Skip rewrite transforms          |
| `--no-git`                   | Skip git initialization          |


For detailed CLI behavior, see `[packages/create/README.md](./packages/create/README.md)`.

Production docs: [https://antd-admin-doc.zuiidea.top](https://antd-admin-doc.zuiidea.top)

## Links

- [Ant Design](https://github.com/ant-design/ant-design)
- [React](https://react.dev)
- [Vite+](https://viteplus.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [Issues](https://github.com/zuiidea/antd-admin/issues)
- [Stars](https://github.com/zuiidea/antd-admin/stargazers)
- [PRs Welcome](https://github.com/zuiidea/antd-admin/pulls)

## License

MIT