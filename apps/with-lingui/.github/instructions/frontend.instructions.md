---
applyTo: "src/**/*.{ts,tsx,css}"
description: "Use when editing React UI, route pages, components, styles, layout, i18n text, or Ant Design behavior. Keywords: frontend, component, page, ui, layout, style, antd, i18n."
---

# Frontend Instructions

## Purpose

Keep frontend changes predictable, minimal, and reusable for AI-assisted edits.

## Do

- Preserve existing route contracts and UI behavior unless explicitly asked.
- Prefer reusable components and hooks over copy-paste logic.
- Keep styles token-driven using `src/theme/theme.config.ts` and `theme.useToken()`.
- For Ant Design styling, follow this priority: component native API (`variant`/`type`/`size`/`styles`/`classNames`) -> `theme.useToken()` with inline `style` -> `className` + external CSS.
- Keep translations compatible with Lingui macros and catalogs.
- Follow current folder conventions under src/components and src/routes.

## Do Not

- Do not introduce new UI libraries when Ant Design already covers the need.
- Do not bypass existing theme/store abstractions with hardcoded global state.
- Do not write CSS overrides first when props or semantic `styles` can express the same UI.
- Do not put literal `#hex` / `rgb()` / `hsl()` colors in business TSX (use `theme.config`, `VITE_BRAND_PRIMARY`, or tokens).
- Do not refactor unrelated files in the same change.

## Golden paths

Classify the page archetype, open the golden path, copy file split and data flow, then replace domain schema/API/columns only.

| Archetype | Path |
|-----------|------|
| ListCRUD | `src/routes/_auth/users/` (includes `-Toolbar.tsx`, `-FormModal.tsx`) |
| Auth | `src/routes/login/` |
| Dashboard | `src/routes/_auth/dashboard/` |
| Shell | `src/components/Layout/` |
| Error | `src/components/NotFound/`, `src/components/RouteError.tsx` |

## Ant Design and tokens

- Prefer `Flex` / `Space` / `Row` / `Col` for layout intent.
- Brand and seed tokens live only in `src/theme/theme.config.ts` (optional `colorPrimary`; `VITE_BRAND_PRIMARY` overrides when set).
- Menu/table chrome algorithms stay in `hooks/tokenBuilders.ts`.

## Div and CSS exceptions

- Native `div` is allowed for `ref` measure slots, scroll containers, and third-party DOM requirements.
- New CSS files must be on the `verify:ui` allowlist (see `scripts/verify-ui.mjs`); prefer tokens over new CSS.

## YAGNI

- Do not extract a shared hook/component without a third call site.
- Do not add parallel abstractions when an existing shell (`DataTable`, `FilterToolbar`, `FormModal`, `useResourceCRUD`) covers the need.

## Validation

- Run: `pnpm check` (or `pnpm exec vp check --no-fmt`)
- Run: `pnpm verify:ui` (local/Agent gate; not CI in phase 1)
- On failure: fix the same violation set at most twice, then stop and shrink scope
- For UI flow changes, run focused e2e where possible
