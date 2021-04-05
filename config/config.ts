import type { IConfig } from 'umi'
import lessToJs from 'less-vars-to-js'
import fs from 'fs'
import path from 'path'
import routes from './routes'
import proxy from './proxy'

const isDevelopment = process.env.NODE_ENV === 'development'

const config: IConfig = {
  // IMPORTANT! change next line to yours or delete. And hide in dev
  publicPath: isDevelopment ? '/' : 'https://cdn.antd-admin.zuiidea.com/',
  hash: true,
  ignoreMomentLocale: true,
  targets: { ie: 9 },
  dynamicImport: {},
  proxy,
  routes,
  // a lower cost way to genereate sourcemap, default is cheap-module-source-map, could save 60% time in dev hotload
  devtool: 'eval',
  // umi3 comple node_modules by default, could be disable
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme
  theme: lessToJs(
    fs.readFileSync(path.join(__dirname, '../src/themes/default.less'), 'utf8')
  ),
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
