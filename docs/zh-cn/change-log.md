## 5.0.0

#### 优化

- 尽量使用修饰器，简化代码编写，提高代码可读性。

- API 配置化，简化获取数据方式。

- `utils` 内文件拆分，各司其职。

- 简化`utils/request`文件，不做特殊处理。

#### 规范

- 函数添加描述、参数、返回值等注释，含糊不清的代码增加注释，规范参考 [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html#appendices-jsdoc-tag-reference)。
  
- 语义化版本号，规范参加 [语义化版本 2.0.0](https://semver.org/lang/zh-CN/)。

- 静态代码检查，统一代码风格，代码提交前将会使用 `prettier`、`stylelint`、`eslint` 规范代码。

- Git 提交信息规范化，[git-commit-emoji-cn](https://github.com/liuchengxu/git-commit-emoji-cn)。

- 基于 `Umi` 的约定式路由，无需再写路由配置文件。  

- 使用 `React 16` 新特性，如 `Fragment`、`Context`、 `PureComponent`等。

#### 功能

- 支持国际化，源码中抽离翻译字段，按需加载语言包，自动在线翻译。

- 支持按需引入 `lodash` 函数。
  
- 支持多布局，可根据规则规定哪些路由使用哪种布局。

- 支持 Antd Admin 在 Travis 上自动编译和部署。

- 使用 `Docsify` 生成文档网站。


#### 样式

- 新增 Antd Admin 独立 Logo。

- 重写整体布局组件，优化菜单、面包屑导航自动高亮，菜单自动展开等逻辑。

- 移动端菜单更改为抽屉式。

#### 其他

- 废弃 `IconFont`、 `Search`、`DataTable`等组件，因为在 `Antd` 中有很好的支持和可替代的。
  

