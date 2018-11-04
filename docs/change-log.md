## 5.0.0

#### Optimization

- Try to use decorators to simplify code writing and improve code readability.

- API configurization to simplify the way data is obtained.

- The files in `utils` are split and each has its own role.

- Simplify the `utils/request` file without special handling.

#### Specification

- Functions add comments, parameters, return values, etc., ambiguous code adds comments, canonical reference [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html#appendices-jsdoc-tag-reference).
  
- Semantic version number, specification participation [semantic version 2.0.0](https://semver.org/lang/zh-CN/).

- Static code checking, unified code style, will use `prettier`, `stylelint`, `eslint` specification code before code submission.

- Git submits information normalization, [git-commit-emoji-cn](https://github.com/liuchengxu/git-commit-emoji-cn).

- Based on the pre-defined routing of `Umi`, there is no need to write a routing configuration file.

- Use `React 16` new features such as `Fragment`, `Context`, `PureComponent`, etc.

#### Features

- Support internationalization, extract source fields from source code, load language packs on demand, and automatically translate online.

- Support for the introduction of `ant-design-pro` components, `lodash` functions on demand.
  
- Support multiple layouts, which rules can be used according to the rules.

- Support Antd Admin to automatically compile and deploy on Travis.

- Generate a documentation website using `Docsify`.


#### Style

- Added Antd Admin standalone Logo.

- Rewrite the overall layout component, optimize the menu, automatic breadcrumb navigation, menu auto-expansion and other logic.

- The mobile menu is changed to drawer.

#### Other

- Discard components such as `IconFont`, `Search`, `DataTable` because they are well supported and replaceable in `Antd`.