<p align="center">
  <a href="http://github.com/zuiidea/antd-admin">
    <img alt="antd-admin" height="64" src="./public/logo.svg">
  </a>
</p>

<h1 align="center">AntD Admin</h1>

<div align="center">

一个简洁的基于 antd、umi 的 admin 模板.

[![antd](https://img.shields.io/badge/antd-^6.0.0-blue.svg?style=flat-square)](https://github.com/ant-design/ant-design) [![umi](https://img.shields.io/badge/umi-^4.0.0-orange.svg?style=flat-square)](https://github.com/umijs/umi) [![GitHub issues](https://img.shields.io/github/issues/zuiidea/antd-admin.svg?style=flat-square)](https://github.com/zuiidea/antd-admin/issues) [![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT) [![欢迎 PR](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/zuiidea/antd-admin/pulls) [![Gitter](https://img.shields.io/gitter/room/antd-admin/antd-admin.svg)](https://gitter.im/antd-admin/antd-admin)

</div>

<!-- - Preview - [https://antd-admin.zuiidea.com](https://antd-admin.zuiidea.com)
- Documentation - [https://superlbr.gitee.io/antd-admin](https://superlbr.gitee.io/antd-admin)
- FAQ - [https://doc.antd-admin.zuiidea.com/#/faq](https://doc.antd-admin.zuiidea.com/#/faq)
- ChangeLog - [https://doc.antd-admin.zuiidea.com/#/change-log](https://doc.antd-admin.zuiidea.com/#/change-log) -->

English | [简体中文](./README-zh_CN.md)

## 主要特性

- 基于 Ant Design 6 + Umi 框架
- TypeScript 支持
- 本地 mock（`mock/index.js`）用于开发阶段模拟接口
- 轻量状态管理：`zustand`
- 常用页面示例：Dashboard、菜单管理、AI Chat 示例等

## 快速开始

推荐使用 pnpm：

```bash
# 安装依赖
pnpm install

# 本地开发
pnpm run dev

# 打包构建
pnpm run build

# 代码检查与格式化
pnpm run lint
pnpm run format
```

（本项目 `package.json` 中的脚本）

## 项目结构（简要）

- `src/`
  - `layouts/` 全局布局
  - `pages/` 页面路由与视图
  - `components/` 公用组件
  - `services/` 接口封装
  - `store/` 全局状态管理
  - `utils/` 工具与配置

## 配置与开发说明

- 本地 mock: `mock/index.js`，开发时可直接使用 mock 接口。
- 路由示例：
  - `/` 或 `/dashboard` — 仪表盘
  - `/users` — 用户管理
  - `/sys/menu` — 菜单管理
  - `/ai/chat` — AI Chat 示例

## 自定义与扩展

- 接口封装位于 `src/services`，按需修改或替换为真实后端。
- 公共组件位于 `src/components`，例如 `DropOption` 可复用于表格操作列。

## 贡献

欢迎提交 issue 或 PR：

- 修复 bug
- 补充示例页面或组件
- 优化类型定义或代码风格
