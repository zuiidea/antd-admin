# Git hooks (repository root)

This directory holds **monorepo root-level** Git hooks. On commit, checks run in the matching subproject based on staged file paths (for example, `vp staged` under `apps/with-lingui` so that directory’s `vite.config.ts` is loaded correctly).

Per-app `.vite-hooks/` under template apps (e.g. `apps/with-lingui/.vite-hooks/`) are for **copying a template out on its own**. When developing in this repo, use the root hooks so `vp staged` at the repo root does not fail to find `vite.config.ts`.

## Monorepo and `vp config`

The root `package.json` `preinstall` sets `core.hooksPath=.githooks` before dependencies install and writes `vp.hooks.disabled=true` in **this clone** so parallel `prepare` scripts (`vp config`) from multiple workspaces do not fight over `.git/config` and cause lock conflicts. Template apps still use `"prepare": "vp config"`; when copied out alone they do not get the root `preinstall`.

## Enabling (one-time)

From the repository root:

```bash
git config core.hooksPath .githooks
```

Or:

```bash
pnpm run setup:git-hooks
```

Verify:

```bash
git config core.hooksPath
# Expected: .githooks
```
