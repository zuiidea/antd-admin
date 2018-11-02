# 快速上手

> 在开始之前，推荐先学习 [React](http://facebook.github.io/react/) 、 [ES2015+](http://es6.ruanyifeng.com/) 、 [Antd Design](https://ant.design/docs/react/introduce-cn) , 了解 [UmiJS](https://umijs.org/) 、[Dva](http://github.com/dvajs/dva) ，并正确安装和配置了 [Node.js](https://nodejs.org/) v8 或以上 、[Git](https://git-scm.com/)。提前了解和学习这些知识会非常有帮助。

## 安装

```bash
git clone https://github.com/zuiidea/antd-admin.git my-project
cd my-project
```

## 目录结构

应用的目录结构如下

```bash
├── dist/               # 默认build输出目录
├── mock/               # Mock文件目录
├── public/             # 静态资源文件目录
├── src/                # 源码目录
│ ├── components/       # 组件目录
│ ├── e2e/              # e2e目录
│ ├── layouts/          # 布局目录
│ ├── locales/          # 国际化文件目录
│ ├── models/           # 数据模型目录
│ ├── pages/            # 页面组件目录
│ ├── services/         # 数据接口目录
│ │ ├── api.js          # 接口配置
│ │ └── index.js        # 接口输出
│ ├── themes/           # 项目样式目录
│ │ ├── default.less    # 样式变量
│ │ ├── index.less      # 全局样式
│ │ ├── mixin.less      # 样式函数
│ │ └── vars.less       # 样式变量及函数
│ ├── utils/            # 工具函数目录
│ │ ├── config.js       # 项目配置
│ │ ├── constant.js     # 静态常量
│ │ ├── index.js        # 工具函数
│ │ ├── request.js      # 异步请求函数(axios)
│ │ └── theme.js        # 项目需要在js中使用到样式变量
├── .editorconfig       # 编辑器配置
├── .env                # 环境变量
├── .eslintrc           # ESlint配置
├── .gitignore          # Git忽略文件配置
├── .prettierignore     # Prettier忽略文件配置
├── .prettierrc         # Prettier配置
├── .stylelintrc.json   # Stylelint配置
├── .travis.yml         # Travis配置
└── .umirc.js           # Umi配置
└──  package.json       # 项目信息
```

## 本地开发

1. 进入目录安装依赖，国内用户推荐使用 [cnpm](https://cnpmjs.org) 进行加速

```bash
yarn install
```

或者

```bash
npm install
```

2. 启动本地服务器

```bash
npm run start
```

3. 启动完成后打开浏览器访问 [http://localhost:7000](http://localhost:7000)，如果需要更改启动端口，可在 `.env` 文件中配置。
