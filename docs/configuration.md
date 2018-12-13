# Configuration

You can do some custom configuration in `/src/utils/config.js`:

## siteName

- Type `String`

  Configure the site name, apply it to the login box, and display the title text at the top of the sidebar.

## copyright

- Type： `String`

  Configure the copyright notice to apply to the login page, at the bottom of the `Primary` layout.

## logoPath

- Type： `String`

  Configure the site logo to apply to the login box and the Logo display at the top of the sidebar.

## apiPrefix

- Type： `String`

  Configure the prefix of the interface in the project. The interface related documents can be viewed [API configuration](API-configuration.md)

## fixedHeader

- Type： `String`

  Under the `Primary` layout, whether the top of the page is fixed when scrolling。

## layouts

- Type： `Array`

  Configuration? Which routes use which layout, unspecified route uses the default layout `Public`, the project currently has `Primary` and `Public` layouts,
     The default configuration is as follows：
  
    ```javascript
        layouts: [
            {
                name: 'primary',
                include: [/.*/],
                exclude: [/(\/(en|zh))*\/login/],
            },
        ],
    ```

    The object properties for each layout are as follows:

    - `name` - The name of the layout;
  
    - `include` - Specifies a list of routing rules that use this layout, which can be a regular expression or a string;
  
    - `exclude` - Specifies a list of routing rules that do not use this layout, which can be a regular expression or a string.
  
 > Note: `exclude` takes precedence over `include`, and the layout previous it has a higher priority than the behind layout. The development process may need to be combined with the layout in the `src/layouts` directory. For details, see [Using Layout](./layout.md).

## i18n

- Type： `Object`

  Configure internationalization, the default configuration is as follows:

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

  - Type： `Array`

    Specify which languages the app supports, and the object properties for each language are as follows:

    - `key` - The `key` of the language is applied to the page url to distinguish the language, and also corresponds to the language package folder name in the `src/locales` directory;

    - `title` - The name of the language, at the bottom of the login page, at the top of the `Primary` layout, the language switch is displayed;

    - `flag` - The path of the flag icon of the language, the language switching display at the top of the `Primary` layout.

 ### i18n.defaultLanguage
   
   - Type： `String`

        Configure the default language.
