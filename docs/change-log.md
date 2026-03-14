## 6.0.0

This project was modernized and migrated to a modern front-end stack. Key highlights of the current version:

### Modern stack
- Upgraded to Ant Design 6, Umi 4 and TypeScript 5.
- React has been updated to the current major line used in the repo (see `package.json`).

### Architecture & DX
- Services are implemented as TypeScript modules under `src/services/` and use a centralized HTTP helper `src/utils/request.ts`.
- Lightweight local state management using `zustand` replacing older `dva` patterns.
- Local mock server using `mock/index.js` with `mockjs` for frontend development without backend dependency.

### Tooling & CI
- Dev workflows use `pnpm` by default; scripts are defined in `package.json` (e.g. `pnpm run dev`, `pnpm run build`).
- Tests use `jest` and related tooling; CI is implemented with GitHub Actions (`.github/workflows/ci.yml`) which installs via `pnpm`, lints and builds the project.

### Quality and types
- TypeScript types are added/expanded under `src/types/` for safer APIs and components.
- Prettier / ESLint configuration added to enforce code style.

### Other
- Documentation is maintained under `docs/` (this site) and updated to reflect the new stack and commands.
- Removed old custom components that duplicate Ant Design functionality and simplified the codebase accordingly.

If you want a more detailed, commit-level changelog for each migration step, I can generate one from git history or help draft a migration guide.