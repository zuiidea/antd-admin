module.exports = {
  siteName: '物模块管理',
  copyright: '物模块管理',
  logoPath: '/logo.svg',
  apiPrefix: '/api/v1',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/(\/(en|zh))*\/login/],
    },
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      // {
      //   key: 'pt-br',
      //   title: 'Português',
      //   flag: '/brazil.svg',
      // },
      // {
      //   key: 'en',
      //   title: 'English',
      //   flag: '/america.svg',
      // },
      {
        key: 'zh',
        title: '中文',
        flag: '/china.svg',
      },
    ],
    defaultLanguage: 'zh',
  },
}
