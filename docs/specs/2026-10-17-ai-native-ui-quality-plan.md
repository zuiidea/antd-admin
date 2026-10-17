# Plan: AI-native UI quality (phase 1)

> Companion design: [2026-10-17-ai-native-ui-quality-design.md](./2026-10-17-ai-native-ui-quality-design.md)

Confirmed naming: **`theme.config.ts` / `themeConfig`**. Optional `colorPrimary`. `verify:ui` local-only. alwaysApply Cursor rule.

Implement in Task order.

## Task 0 — Land Spec/Plan

**Files:**

- Create: `docs/specs/2026-10-17-ai-native-ui-quality-design.md`
- Create: `docs/specs/2026-10-17-ai-native-ui-quality-plan.md`

**Done when:** both files exist (with `theme.config` naming).

## Task 1 — `apps/basic` theme SSOT

**Files:**

- Create: `apps/basic/src/theme/theme.config.ts`
- Modify: `apps/basic/src/hooks/tokenBuilders.ts`

**Steps:**

1. Create `theme.config.ts` with seeds + optional `colorPrimary` type slot.
2. Import `themeConfig` in `tokenBuilders`; delete local duplicates.
3. Run `pnpm check` in `apps/basic`.

**Done when:** check green; theme seeds live in `theme.config.ts`.

## Task 2 — `apps/with-lingui` theme mirror

**Files:**

- Create: `apps/with-lingui/src/theme/theme.config.ts`
- Modify: `apps/with-lingui/src/hooks/tokenBuilders.ts`

**Steps:** Mirror basic seeds; preserve `VITE_BRAND_PRIMARY` / `readBrandPrimary` (env wins over optional static `colorPrimary`).

**Done when:** lingui `pnpm check` green; primary env override still works.

## Task 3 — verify-ui (`basic`)

**Files:**

- Create: `apps/basic/scripts/verify-ui.mjs`
- Modify: `apps/basic/package.json` (`verify:ui` script)

**Done when:** `pnpm verify:ui` prints OK, exit 0. No CI wiring.

## Task 4 — verify-ui (`with-lingui`)

**Files:** Mirror Task 3.

**Done when:** lingui `pnpm verify:ui` OK.

## Task 5 — Instructions + Cursor rule

**Files:**

- Modify both apps’ `frontend.instructions.md`, `refactor.instructions.md`, `AGENTS.md`, instructions `README.md`
- Optionally tighten `api.instructions.md` Zod line if missing
- Create: `.cursor/rules/ai-native-ui-quality.mdc` (`alwaysApply: true`)

**frontend.instructions.md required sections:**

```markdown
## Golden paths
## Ant Design and tokens
## Div and CSS exceptions
## YAGNI
## Validation
```

Validation must include check + `pnpm verify:ui` (local/Agent).

**Done when:** both frontends have golden path table; root Cursor rule exists and is short.

## Task 6 — Acceptance

1. Both apps: `pnpm check` && `pnpm verify:ui`
2. `pnpm test:unit` where feasible
3. Diff check: no `packages/create`, no new dependencies, no new `packages/*`, no CI `verify:ui` job

**Done when:** design success criteria satisfied.

## Commit strategy

1. `docs: add AI-native UI quality spec and plan`
2. `feat(basic): extract theme.config SSOT`
3. `feat(with-lingui): mirror theme.config SSOT`
4. `feat: add verify:ui scripts for admin templates`
5. `docs: harden agent UI/quality instructions`

## Out of scope reminders

- No `packages/ui`, eslint plugin, create CLI flags, CI verify job, LLM review, or screenshot baselines.
