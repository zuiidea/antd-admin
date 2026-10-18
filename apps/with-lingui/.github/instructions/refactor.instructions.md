---
applyTo: "src/**/*.{ts,tsx}"
description: "Use when refactoring existing code for deduplication, modularization, naming cleanup, or maintainability improvements without behavior changes. Keywords: refactor, cleanup, simplify, deduplicate, maintainability."
---

# Refactor Instructions

## Purpose

Reduce duplication while preserving behavior and public contracts.

## Do

- Keep refactors incremental and scoped to one concern per change.
- Prefer extracting shared utilities/hooks/components over large rewrites.
- Preserve existing external behavior and route/store contracts.
- Keep diffs reviewable with minimal unrelated formatting churn.
- Add or update lightweight comments only when logic is non-obvious.

## Do Not

- Do not change runtime behavior unless explicitly requested.
- Do not rename broadly across the codebase without clear benefit.
- Do not delete tests that still cover unique critical scenarios.
- Do not introduce large dependencies for minor convenience; prefer composition or small utilities.

## Considerations

- Bundle: Main app chunk is ~135KB (gzip ~41KB). Ant Design (vendor-antd) and TanStack (vendor-tanstack) are in separate chunks for parallel loading. Avoid adding large UI libraries when Ant Design covers the need.
- Type safety: Keep validations at API boundaries (Zod schemas) rather than adding more runtime checks throughout the app.

## Validation

- Confirm no new diagnostics in touched files.
- Run: `pnpm exec vp check --no-fmt`
- For significant changes, verify bundle size impact: `pnpm run build 2>&1 | grep "kB"`
