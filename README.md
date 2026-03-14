<p align="center">
  <a href="http://github.com/zuiidea/antd-admin" target="_blank">
    <img alt="antd-admin-logo" height="80" src="./public/logo.svg">
  </a>
</p>

<h1 align="center">AntD Admin</h1>

<div align="center">

An excellent enterprise-grade front-end solution built with Ant Design 6, Umi 4, and TypeScript.

[![antd](https://img.shields.io/badge/AntD-^6.0.0-1890ff?style=flat-square&logo=ant-design)](https://github.com/ant-design/ant-design)
[![umi](https://img.shields.io/badge/Umi-^4.0.0-ff9900?style=flat-square&logo=umijs)](https://github.com/umijs/umi)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![GitHub issues](https://img.shields.io/github/issues/zuiidea/antd-admin?style=flat-square)](https://github.com/zuiidea/antd-admin/issues)
[![GitHub stars](https://img.shields.io/github/stars/zuiidea/antd-admin?style=flat-square)](https://github.com/zuiidea/antd-admin/stargazers)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](http://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/zuiidea/antd-admin/pulls)

</div>

---

## 📖 Introduction

**AntD Admin** is a lightweight, high-performance admin template designed to provide a clean and extensible starting point for building enterprise applications. It leverages the latest features of **Ant Design 6**, **Umi 4**, and **TypeScript**, offering a modern development experience with minimal boilerplate.

Whether you are building a dashboard, a management system, or an AI-powered tool, this project provides the essential foundation you need.

## ✨ Key Features

- 🚀 **Modern Stack**: Built on **Ant Design 6** + **Umi 4** + **TypeScript**.
- 🎨 **Clean Architecture**: Lightweight state management using `zustand`.
- 🛠 **Dev Experience**: Integrated local mock server (`mock/index.js`) for seamless frontend development without backend dependency.
- 📦 **Rich Examples**: Includes ready-to-use pages:
  - 📊 **Dashboard**: Data visualization overview.
  - 👥 **User Management**: CRUD operations example.
  - 🧩 **Menu Management**: Dynamic routing configuration.
  - 🤖 **AI Chat Demo**: Integration example for LLM interfaces.
- ✅ **CI/CD Ready**: Pre-configured GitHub Actions for linting and building.

## 🚀 Quick Start

We recommend using **pnpm** for package management.

```bash
# 1. Clone the repository
git clone https://github.com/zuiidea/antd-admin.git -b master --depth=1
cd antd-admin

# 2. Install dependencies
pnpm install

# 3. Start local development server (with mock data)
npm run dev

# 4. Build for production
npm run build

# 5. Code quality checks
npm run lint
npm run format
```

🔌 **Development Notes**

#### Mock Server

The project includes a built-in mock server defined in `mock/index.js`. This allows you to develop frontend features independently of the backend.

To disable mocks or switch to a real API, modify the proxy settings in your configuration file (for example, `config/proxy.ts` or `.umirc.ts`).

#### Common Routes

| Route | Description |
| --- | --- |
| `/` or `/dashboard` | Main Dashboard |
| `/users` | User List & Management |
| `/sys/menu` | System Menu Configuration |
| `/ai/chat` | AI Chat Interface Demo |

#### Customization

- **API Integration:** Update API endpoints in `src/services` to connect to your real backend.
- **Component Extension:** Reuse or extend existing components in `src/components` (for example, `DropOption`, `StandardTable`).
- **Theme:** Customize Ant Design tokens in the theme configuration to match your brand identity.

#### GitHub Actions CI

This repository includes a pre-configured GitHub Actions workflow to ensure code quality:

- Installs dependencies using `pnpm`.
- Runs linting checks.
- Builds the project for production.

- **Workflow location:** `.github/workflows/ci.yml`
- **Tip:** To add automated tests to the CI pipeline, add a test script to `package.json` and update the workflow YAML accordingly.
🤝 Contributing
Contributions are always welcome! Whether it's fixing a bug, adding a new feature, or improving documentation, please feel free to submit an Issue or a Pull Request.
Typical contributions include:
🐛 Bug fixes
🧩 New example pages or components
📝 Type definitions and linting improvements
🌍 Internationalization (i18n) updates
How to contribute:
Fork the repository.
Create your feature branch (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -m 'Add some AmazingFeature').
Push to the branch (git push origin feature/AmazingFeature).
Open a Pull Request.
📄 License
This project is licensed under the MIT License.
Made with ❤️ by zuiidea and contributors.
