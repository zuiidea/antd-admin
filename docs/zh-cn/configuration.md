# 配置项

你可以在 `/src/utils/config.js` 里做一些自定义配置：

## siteName

- 类型： `String`

  配置站点名称，应用到登录框，侧边栏顶部的标题文字显示。

## copyright

- 类型： `String`

  配置版权声明，应用到登录页、`Primay`布局底部。

## logoPath

- 类型： `String`

  配置站点 Logo，应用到登录框，侧边栏顶部的 Logo 显示。

## apiPrefix

- 类型： `String`

  配置项目中接口的前缀，接口相关文档可查看 [接口配置](API-configuration.md)

## fixedHeader

- 类型： `String`

  在`Primary`布局下，页面滚动时是否固定顶部。

## layouts

- 类型： `Array`

    配置哪些路由使用哪种布局，未指定路由使用默认布局 `Public`，项目中目前有 `Primary` 和 `Public` 两种布局，
    默认配置如下：
  
    ```javascript
        layouts: [
            {
                name: 'primary',
                include: [/.*/],
                exclude: [/(\/(en|zh))*\/login/],
            },
        ],
    ```

    每种布局的对象属性如下：

    - `name` - 布局的名称；
  
    - `include` - 指定使用该布局的路由规则列表，规则可为正则表达式或者字符串；
  
    - `exclude` - 指定不使用该布局的路由规则列表，规则可为正则表达式或者字符串。
  
 > 注意：`exclude` 优先级高于 `include`，前面的布局优先级高于后面的布局。开发过程中可能需要结合`src/layouts`目录下的布局使用，具体方法可查看 [使用布局](./layout.md)。

## i18n

- 类型： `Object`

  配置国际化，默认配置如下：

  ```javascript
  i18n: {
      languages: [
        {
            key: 'en',
            title: 'English',
            flag: '/america.svg',
        },
        {
            key: 'zh',
            title: '中文',
            flag: '/china.svg',
        },
      ],
      defaultLanguage: 'en',
  }
  ```

  ### i18n.languages

  - 类型： `Array`

    指定应用支持哪些语言，每种语言的对象属性如下：

    - `key` - 语言的`key`，应用到页面 url 上以区分语言，也对应 `src/locales` 目录下的语言包文件夹名；

    - `title` - 语言名称，在登录页底部、`Primay` 布局顶部语言切换显示；

    - `flag` - 语言的国旗图标的路径，在 `Primay` 布局顶部语言切换显示。

 ### i18n.defaultLanguage
   
   - 类型： `String`

        配置默认语言。
