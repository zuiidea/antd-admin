# 目录及约定

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
