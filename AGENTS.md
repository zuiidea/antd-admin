# antd-admin (monorepo)

Enterprise admin templates and docs. **AI and coding rules live in each app’s `AGENTS.md`**, not here.

## Layout

| Path | Role |
| --- | --- |
| `apps/basic` | English Vite+ template — see `apps/basic/AGENTS.md` |
| `apps/with-lingui` | Lingui i18n template — see `apps/with-lingui/AGENTS.md` |
| `apps/docs` | Nextra docs site |
| `packages/create` | `init-antd-admin` CLI |

## Commands (repo root)

- `pnpm install` — sets `core.hooksPath=.githooks` via `preinstall`
- `pnpm dev` / `pnpm build` / `pnpm fmt` / `pnpm lint` — turbo across workspaces

**Template app work:** `cd apps/basic` or `cd apps/with-lingui`, then use **`vp`** (`vp install`, `vp check`, …). Do not run app `vp staged` from root without that `cd`.

## Git hooks

`.githooks/pre-commit` runs checks by staged paths: `pnpm exec vp staged` in `apps/basic` / `apps/with-lingui`, typecheck for `packages/create`, lint for `apps/docs`.
