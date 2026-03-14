<p align="center">
	<a href="http://github.com/zuiidea/antd-admin" target="_blank">
		<img alt="antd-admin-logo" height="80" src="./public/logo.svg">
	</a>
</p>

<h1 align="center">AntD Admin</h1>

<div align="center">

基于 Ant Design 6、Umi 4 与 TypeScript 构建的企业级前端解决方案。

</div>

---

## 📖 项目简介

**AntD Admin** 是一个轻量、高性能的管理后台模板，旨在为构建企业级应用提供干净、可扩展的起点。项目使用 **Ant Design 6**、**Umi 4** 与 **TypeScript** 的最新特性，减轻样板代码，提升开发体验。

无论您要构建仪表盘、管理系统，还是集成 AI 功能的工具，本项目都能提供必要的基础。

## ✨ 主要特性

- 🚀 **现代栈**：基于 **Ant Design 6** + **Umi 4** + **TypeScript**。
- 🎨 **清晰架构**：使用 `zustand` 进行轻量状态管理。
- 🛠 **良好的开发体验**：内置本地 mock 服务器（`mock/index.js`），无需后端即可开发前端功能。
- 📦 **丰富示例页面**：包含可直接使用的页面示例：
	- 📊 **仪表盘**：数据可视化概览。
	- 👥 **用户管理**：CRUD 操作示例。
	- 🧩 **菜单管理**：动态路由配置示例。
	- 🤖 **AI 聊天示例**：大模型（LLM）接口集成示例。
- ✅ **CI/CD 支持**：预配置的 GitHub Actions 工作流，用于 lint 和构建。

## 🚀 快速开始

建议使用 **pnpm** 进行包管理。

```bash
# 1. 克隆仓库
git clone https://github.com/zuiidea/antd-admin.git -b master --depth=1
cd antd-admin

# 2. 安装依赖
pnpm install

# 3. 启动本地开发（含 mock 数据）
npm run dev

# 4. 构建生产包
npm run build

# 5. 代码质量检查
npm run lint
npm run format
```

🔌 开发说明

#### Mock 服务

项目包含位于 `mock/index.js` 的内置 mock 服务，方便在没有后端的情况下独立开发前端功能。

如需关闭 mock 或切换到真实 API，请修改项目的代理配置（例如 Umi 项目可能的配置文件 `config/proxy.ts`、`.umirc.ts` 或 `config/config.ts`），以匹配您的实际项目结构。

#### 常用路由

| 路由 | 说明 |
| --- | --- |
| `/` 或 `/dashboard` | 主仪表盘 |
| `/users` | 用户列表与管理 |
| `/sys/menu` | 系统菜单配置 |
| `/ai/chat` | AI 聊天示例界面 |

#### 定制化

- **API 集成：** 在 `src/services` 中更新 API 接口以对接真实后端。
- **组件扩展：** 在 `src/components` 中复用或扩展现有组件（例如 `DropOption`、`StandardTable`）。
- **主题：** 在主题配置中自定义 Ant Design 变量以匹配品牌视觉。

#### GitHub Actions（CI）

仓库包含预配置的 GitHub Actions 工作流（见 `.github/workflows/ci.yml`），用于保证代码质量：

- 使用 `pnpm` 安装依赖。
- 运行 lint 检查。
- 构建生产包。

- **工作流位置：** `.github/workflows/ci.yml`
- **提示：** 若要在 CI 中加入自动化测试，请在 `package.json` 中添加测试脚本并更新 workflow YAML。

## 🤝 贡献

欢迎各类贡献：修复 bug、添加新示例页面或组件、完善类型定义与 lint 规则、改进国际化等。

常见贡献流程：

1. Fork 仓库。
2. 新建分支：`git checkout -b feature/AmazingFeature`。
3. 提交变更：`git commit -m 'Add some AmazingFeature'`。
4. 推送分支：`git push origin feature/AmazingFeature`。
5. 提交 Pull Request。

## 📄 许可证

本项目采用 MIT 许可证。

由 zuiidea 与贡献者共同维护，Made with ❤️。

