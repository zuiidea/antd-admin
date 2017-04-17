# Antd Admin


[![Build Status](https://img.shields.io/travis/tigaly/antd-admin.svg?style=flat)](https://travis-ci.org/tigaly/antd-admin)
[![dependencies Status](https://david-dm.org/tigaly/antd-admin/status.svg)](https://david-dm.org/tigaly/antd-admin)
[![Code Climate](https://codeclimate.com/github/tigaly/antd-admin/badges/gpa.svg)](https://codeclimate.com/github/tigaly/antd-admin)
[![Join the chat at https://gitter.im/dva-antd-wrapper/Lobby](https://badges.gitter.im/antd-admin/Lobby.svg)](https://gitter.im/antd-admin/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## 特性

-   基于[react](https://github.com/facebook/react)，[ant-design](https://github.com/ant-design/ant-design)，[dva](https://github.com/dvajs/dva)，[Mock](https://github.com/nuysoft/Mock) 企业级后台管理系统最佳实践
-   基于[Mock](https://github.com/nuysoft/Mock)实现脱离后端独立开发
-   基于Antd UI 设计语言，提供后台管理系统常见使用场景
-   基于[dva](https://github.com/dvajs/dva)动态加载 Model 和路由，按需加载
-   浅度响应式设计

## 更新日志

### 4.1

`2017-04-14`

-   升级开发工具为[roadhog](https://github.com/sorrycc/roadhog)
-   使用`roadhog`的mock功能
-   增强`utils/request.js`跨域处理能力

## 开发构建

### 目录结构

```bash
├── /mock/              # 数据mock的接口文件
├── /dist/              # 项目输出目录
├── /src/               # 项目源码目录
│ ├── /components/      # UI组件及UI相关方法
│ ├── /routes/          # 路由组件
│ │ └── app.js          # 路由入口
│ ├── /models/          # 数据模型
│ ├── /services/        # 数据接口
│ ├── /utils/           # 工具函数
│ │ ├── config.js       # 项目常规配置
│ │ ├── menu.js         # 侧边菜单配置
│ │ ├── config.js       # 项目常规配置
│ │ ├── request.js      # 异步请求函数
│ │ └── theme.js        # 项目需要在js中使用到样式变量
│ ├── route.js          # 路由配置
│ ├── index.js          # 入口文件
├── package.json        # 项目信息
├── .roadhogrc.js       # 打包配置
└── .roadhogrc.mock.js  # 数据mock配置
```

文件夹命名说明:

-   components：组件（方法）为单位以文件夹保存，文件夹名组件首字母大写（如`DataTable`），方法首字母小写（如`layer`）,文件夹内主文件与文件夹同名，多文件以`index.js`导出对象（如`./src/components/Layout`）
-   routes：页面为单位以文件夹保存，文件夹名首字母小写（特殊除外，如`UIElement`）,文件夹内主文件以`index.js`导出，多文件时可建立`components`文件夹（如`./src/routes/dashboard`），如果有子路由，依次按照路由层次建立文件夹（如`./src/routes/UIElement`）

### 快速开始

克隆项目文件:

    git clone https://github.com/tigaly/antd-admin.git

进入目录安装依赖:

    npm i 或者 yarn install

开发：

```bash
npm start    # 使用mock拦截请求，数据存储在localStroge里
```

构建：

```bash
npm run build

将会生成dist目录
```

代码检测：

```bash
npm run lint
```

## 参考

dashboard设计稿：<https://dribbble.com/shots/3108122-Dashboard-Admin> （已征得作者同意）


### What's next?

* Connect to the expressjs server side [Starter-node-rest](https://github.com/tigaly/starter-nodejs-rest)