import type { IConfig } from 'umi'
import lessToJs from 'less-vars-to-js'
import fs from 'fs'
import path from 'path'
import routes from './routes'
import proxy from './proxy'

const isDevelopment = process.env.NODE_ENV === 'development'
const theme = lessToJs(
  fs.readFileSync(path.join(__dirname, '../src/themes/default.less'), 'utf8')
)

const config: IConfig = {
  // IMPORTANT! change next line to yours or delete. And hide in dev
  publicPath: isDevelopment ? '/' : 'https://cdn.antd-admin.zuiidea.com/',
  hash: true,
  ignoreMomentLocale: true,
  targets: { ie: 9 },
  dynamicImport: {},
  theme,
  proxy,
  routes,
  devtool: 'eval',
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  mock: {
    exclude: ['utils/index'],
  },
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
  chainWebpack: (memo) => {
    memo.module.rule('po').test(/\.po$/).use('po').loader('@lingui/loader')
  },
}

export default config
