import type { IConfig } from 'umi'
import routes from './routes'
import proxy from './proxy'

const config: IConfig = {
  ignoreMomentLocale: true,
  targets: { ie: 9 },
  dynamicImport: {},
  proxy,
  routes,
  extraBabelPresets: ['@lingui/babel-preset-react'],
  extraBabelPlugins: [
    'macros',
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
  ],
  chainWebpack:(memo) => {
    memo.module.rule('po').test(/\.po$/).use('po').loader('@lingui/loader')
  }
}

export default config
