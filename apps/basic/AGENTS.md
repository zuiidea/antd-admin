# antd-admin-basic

Vite+ template app (React 19, Ant Design 6, TanStack Router/Query, MSW). Default UI copy is English (no i18n). CLI details: [viteplus.dev](https://viteplus.dev).

## Commands

Run from **this app root** (directory with `package.json` / `vite.config.ts`):

| Task                      | Command                                              |
| ------------------------- | ---------------------------------------------------- |
| Install deps              | `vp install` (after every pull)                      |
| Dev / build / preview     | `vp dev`, `vp build`, `vp preview`                   |
| Format / lint / typecheck | `vp check`, `vp check --no-fmt`, `vp lint`, `vp fmt` |
| Unit tests                | `vp test run`                                        |
| E2E                       | `pnpm run test:e2e` (or focused spec via Playwright) |
| Add/remove deps           | `vp add`, `vp remove` — not raw `pnpm`/`npm`/`yarn`  |

**Pitfalls:** Do not install Vitest/Oxlint/Oxfmt/tsdown directly; use `vp`. Do not run `vp vitest` — use `vp test`. If a `package.json` script name conflicts with a built-in `vp` command, use `vp run <script>`. Import toolchain modules from `vite-plus` (e.g. `defineConfig`, test utils), not standalone `vite`/`vitest` packages.

**Before finishing:** `vp check` and `vp test run`; run focused e2e when UI flows change.

---

## Frontend

**Purpose:** Predictable, minimal UI changes under `src/`.

**Do:** Preserve route/UI contracts unless asked. Reuse components/hooks. Token-driven styles via theme/store. Ant Design styling order: component API → `theme.useToken()` + inline `style` → `className` + CSS. English plain string literals. Follow `src/components` and `src/routes` layout.

**Do not:** New UI libs when Ant Design suffices; bypass theme/store; CSS-first overrides when props/`styles` work; unrelated refactors in the same change.

**Validation:** `vp check --no-fmt`; focused e2e when flows change.

---

## API

**Purpose:** **schemas → `defineApi` modules → UI**; transport in `src/api/request.ts` only.

**Do:** Define APIs with `defineApi` in `src/api/<module>/index.ts` (`method` default `GET`; `params`/`query`/`body` + `output`). Zod in `src/api/<module>/schemas.ts`; shared helpers in `src/api/shared/`. MSW envelopes `{ code, data, message }` aligned with schemas. Co-locate query keys (e.g. `userQueryKeys`). `hydrateSession` from `@/api/auth` after login/register/session restore.

**Do not:** Call axios or `@/api/request` from routes/components — use resource functions (`listUsers`, …). Ad-hoc response shapes; skip schema parsing; mix unrelated domains in one module.

**Validation:** `vp check --no-fmt`.

---

## Testing

**Purpose:** Fast, deterministic tests for core flows (auth, users CRUD, permissions).

**Do:** User-visible assertions; reuse test helpers; keep mocks/schemas in sync; focused runs while iterating.

**Do not:** Brittle DOM-internal selectors; bloated fixtures; duplicate scenarios.

**Validation:** Focused tests first; `vp check --no-fmt`.

---

## Refactor

**Purpose:** Less duplication, same behavior and public contracts.

**Do:** One concern per change; extract shared utils/hooks/components; reviewable diffs; comments only when non-obvious.

**Do not:** Behavior changes unless requested; broad renames; drop unique test coverage; heavy deps for tiny wins.

**Considerations:** Main chunk ~135KB gzip ~41KB; vendor splits for antd/tanstack — avoid large extra UI libs. Validate at API boundaries (Zod), not app-wide runtime checks.

**Validation:** `vp check --no-fmt`; significant changes → `vp build` and watch chunk sizes in log.

---

## Add CRUD resource

Multi-step checklist (mirror **users**): use skill **`.agents/skills/add-resource/SKILL.md`** (invoke in Copilot/Codex/Claude or `@` that path in chat). After routes change, run `pnpm run build` to refresh `routeTree.gen.ts`.
