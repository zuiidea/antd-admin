# AI Instruction Files

This directory contains scoped instruction files used by AI coding agents.

## Files

- `frontend.instructions.md`: UI/routes/components/style changes (includes golden paths and `verify:ui`)
- `testing.instructions.md`: Playwright/MSW/test changes
- `api.instructions.md`: API client/schema/handler changes
- `refactor.instructions.md`: behavior-preserving cleanup and deduplication
- `add-resource.instructions.md`: add a new CRUD resource (manual / Agent checklist; mirror `users`)

UI golden paths and Ant Design/token rules live in `frontend.instructions.md`.

## Authoring Rules

- Keep each file focused on one domain.
- Put trigger phrases in `description` so agents can discover the file.
- Use narrow `applyTo` patterns to avoid unnecessary context load.
- Keep instructions executable: short Do/Do Not/Validation sections.
