<p align="center">
  <a href="http://github.com/zuiidea/antd-admin">
    <img alt="antd-admin" height="64" src="../_media/logo.svg">
  </a>
</p>

<h1 align="center">AntD Admin</h1>

<div align="center">

基于 Ant Design 6、Umi 4 与 TypeScript 的企业级前端起手模版。

[![antd](https://img.shields.io/badge/AntD-^6.0.0-1890ff?style=flat-square&logo=ant-design)](https://github.com/ant-design/ant-design)
[![umi](https://img.shields.io/badge/Umi-^4.0.0-ff9900?style=flat-square&logo=umijs)](https://github.com/umijs/umi)

</div>

- 文档源文件位于 `docs/` 目录。

## 快速开始

本仓库示例与 CI 使用 `pnpm`，你也可以使用 `npm` 或 `yarn`，但推荐 `pnpm`。

```bash
# 克隆
git clone https://github.com/zuiidea/antd-admin.git
cd antd-admin

# 安装依赖
pnpm install

# 启动开发（含本地 mock）
npm run dev

# 构建
npm run build

# lint 与格式化
npm run lint
npm run format
```

说明：

- 本地 mock 实现在 `mock/index.js`，便于在无后端时开发。
- CI 工作流位于 `.github/workflows/ci.yml`（使用 pnpm、lint、build）。
- 若需对接真实后端，请修改 `src/services` 下的 API。

更多详细文档请查看 `docs/` 目录下的其他页面。

## 参与贡献

欢迎提交 Issue 或 PR 改进项目文档或代码。
