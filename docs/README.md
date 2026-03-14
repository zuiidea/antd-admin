<p align="center">
  <a href="http://github.com/zuiidea/antd-admin">
    <img alt="antd-admin" height="64" src="./_media/logo.svg">
  </a>
</p>

<h1 align="center">AntD Admin</h1>

<div align="center">

An enterprise-grade front-end starter built with Ant Design 6, Umi 4 and TypeScript.

[![antd](https://img.shields.io/badge/AntD-^6.0.0-1890ff?style=flat-square&logo=ant-design)](https://github.com/ant-design/ant-design)
[![umi](https://img.shields.io/badge/Umi-^4.0.0-ff9900?style=flat-square&logo=umijs)](https://github.com/umijs/umi)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](http://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/zuiidea/antd-admin/pulls)

</div>

- Documentation source for this project is under `docs/`.

## Quick start

This repository uses `pnpm` in examples and CI; `npm` or `yarn` also work but `pnpm` is recommended.

```bash
# clone
git clone https://github.com/zuiidea/antd-admin.git
cd antd-admin

# install
pnpm install

# start dev server (includes local mock server)
npm run dev

# build
npm run build

# lint & format
npm run lint
npm run format
```

Notes:

- Mock data live in `mock/index.js` and the project can run without a backend during development.
- CI workflow is available at `.github/workflows/ci.yml` (uses pnpm, lint, build).
- Update API endpoints under `src/services` to integrate a real backend.

For detailed documentation see the other pages in this `docs/` folder.

## Contributing

Contributions welcome — file issues or open a PR as usual on GitHub.

