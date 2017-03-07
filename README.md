# Antd Admin
[![React Native](https://img.shields.io/badge/react-^15.4.1-brightgreen.svg?style=flat-square)](https://github.com/facebook/react)
[![Ant Design](https://img.shields.io/badge/ant--design-^2.7.0-yellowgreen.svg?style=flat-square)](https://github.com/ant-design/ant-design)
[![dva](https://img.shields.io/badge/dva-^1.1.0-orange.svg?style=flat-square)](https://github.com/dvajs/dva)

[![GitHub issues](https://img.shields.io/github/issues/zuiidea/antd-admin.svg?style=flat-square)](https://github.com/zuiidea/antd-admin)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/zuiidea/antd-admin/pulls)
[![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT)

演示地址 http://zuiidea.github.io/antd-admin/

## 特性

- 基于[react](https://github.com/facebook/react)，[ant-design](https://github.com/ant-design/ant-design)，[dva](https://github.com/dvajs/dva)，[Mock](https://github.com/nuysoft/Mock) 企业级后台管理系统最佳实践
- 基于[Mock](https://github.com/nuysoft/Mock)实现脱离后端独立开发
- 基于Antd UI 设计语言，提供后台管理系统常见使用场景
- 基于[dva](https://github.com/dvajs/dva)动态加载 Model 和路由，按需加载
- 浅度响应式设计

## To do list
- [x] 登录页面
- [x] dashbord页面
  - [x] 数字卡片
  - [x] 实时天气卡片
  - [x] 图表
- [x] 用户列表页面
  - [x] 增删改查
  - [x] 交互动效
- [x] 扩展UI组件
 - [x] Ico
 - [x] Search
- [ ] 数据可视化页面
- [ ] 模拟消息收发


- [ ] 升级dva-cli
- [ ] 加入dva-loading
- [ ] 规范代码，目前代码遵循[standardjs](http://standardjs.com/demo.html)

## 开发及构建

### 目录结构

```bash
├── /mock/           # 数据mock的接口文件
├── /dist/           # 项目输出目录
├── /src/            # 项目源码目录
│ ├── /components/   # 项目组件
│ ├── /routes/       # 路由组件
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /utils/        # 工具函数
│ ├── route.js       # 路由配置
│ ├── index.js       # 入口文件
│ └── index.html     
├── package.json     # 项目信息
└── proxy.config.js  # 数据mock配置

```

### 快速开始

克隆项目文件:

```
git clone git@github.com:zuiidea/antd-admin.git
```

进入目录安装依赖:

```
npm i 或者 yarn install
```

开发：

```bash
npm run dev    # 使用mock拦截请求，数据存储在localStroge里

打开 http://localhost:8000
```


构建：

```bash
npm run build

将会生成dist目录
```

### 注意事项

- 生产环境中，已有数据接口，请将`src/utils/index.js`第四行 `require('./mock.js')`注释
- 开发环境中，如再mock目录新增文件，请在`src/utils/mock.js`第二行的`mockData`数组中添加
- 如需重写antd样式配置，请修改`src/theme.js`
- 项目配置文件在`src/utils/config.js`
- 如需重写异步请求函数，请修改`src/utils/request.js`
  （关于为什么使用robe-ajax而不是fetch：在一个无服务器的环境中模拟数据请求，[Mock](https://github.com/nuysoft/Mock)不能拦截Fetch，只能拦截XHR，所以我选了一个类似jquery Ajax的库robe-ajax）

## 参考

用户列表：https://github.com/dvajs/dva/tree/master/examples/user-dashboard

dashboard设计稿：https://dribbble.com/shots/3108122-Dashboard-Admin （已征得作者同意）

## 截屏

web

![](assets/demo4.gif)

移动

![](assets/demo3.gif)
