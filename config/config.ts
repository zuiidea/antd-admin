/**
 * see more, https://umijs.org/config
 */
import type { IConfig } from 'umi'
import lessToJs from 'less-vars-to-js'
import fs from 'fs'
import path from 'path'
import routes from './routes'
import proxy from './proxy'

const theme = lessToJs(
  fs.readFileSync(path.join(__dirname, '../src/themes/default.less'), 'utf8')
)

const config: IConfig = {
  hash: true,
  ignoreMomentLocale: true,
  targets: { ie: 11 },
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
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
      'antd',
    ],
    [
      'import',
      {
        libraryName: '@ant-design',
        libraryDirectory: 'icons',
        camel2DashComponentName: false,
      },
      'ant-design-icons',
    ],
  ],
  chainWebpack: (memo) => {
    memo.module.rule('po').test(/\.po$/).use('po').loader('@lingui/loader')
  },
  fastRefresh: {},
  esbuild: {},
}

export default config
