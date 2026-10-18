---

## applyTo: "src/\*_/_.{ts,tsx,css}"

description: "Use when editing React UI, route pages, components, styles, layout, copy, or Ant Design behavior. Keywords: frontend, component, page, ui, layout, style, antd, english copy."

# Frontend Instructions

## Purpose

Keep frontend changes predictable, minimal, and reusable for AI-assisted edits.

## Do

- Preserve existing route contracts and UI behavior unless explicitly asked.
- Prefer reusable components and hooks over copy-paste logic.
- Keep styles token-driven using existing theme/store patterns.
- For Ant Design styling, follow this priority: component native API (`variant`/`type`/`size`/`styles`/`classNames`) -> `theme.useToken()` with inline `style` -> `className` + external CSS.
- Keep user-facing copy in English as plain string literals (this template has no i18n layer).
- Follow current folder conventions under src/components and src/routes.

## Do Not

- Do not introduce new UI libraries when Ant Design already covers the need.
- Do not bypass existing theme/store abstractions with hardcoded global state.
- Do not write CSS overrides first when props or semantic `styles` can express the same UI.
- Do not refactor unrelated files in the same change.

## Validation

- Run: `vp check --no-fmt`
- For UI flow changes, run focused e2e where possible.
