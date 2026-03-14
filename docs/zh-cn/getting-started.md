# 快速上手

> 在开始之前，推荐先学习 [React](http://facebook.github.io/react/) 、 [ES2015+](http://es6.ruanyifeng.com/) 、 [Antd Design](https://ant.design/docs/react/introduce-cn) , 了解 [UmiJS](https://umijs.org/) 、[Dva](http://github.com/dvajs/dva) ，并正确安装和配置了 [Node.js](https://nodejs.org/) v8 或以上 、[Git](https://git-scm.com/)。提前了解和学习这些知识会非常有帮助。

## 安装

```bash
git clone https://github.com/zuiidea/antd-admin.git my-project
cd my-project
```

1. 克隆项目并安装依赖（推荐使用 `pnpm`）。

```bash
git clone https://github.com/zuiidea/antd-admin.git my-project
cd my-project
pnpm install
```

或使用其它包管理器：

```bash
npm install
# 或
yarn install
```

2. 启动开发模式：

```bash
npm run dev
```

3. 启动完成后在浏览器打开项目（查看开发服务器输出以获取实际 URL/端口）。
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

项目推荐使用 `pnpm` 进行依赖管理：

```bash
pnpm install
npm run dev
```

也可以使用 `npm` 或 `yarn`：

```bash
npm install
# 或
yarn install
# 然后使用对应的启动命令，例如 `npm run dev` 或 `yarn dev`（若 package.json 中配置了），
# 本仓库默认开发脚本为 `npm run dev`。
```

启动后在浏览器打开项目（查看开发服务器输出以获取实际 URL/端口）。
