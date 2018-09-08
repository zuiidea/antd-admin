// https://umijs.org/config/
import { resolve } from 'path'

export default {
  plugins: [
    [
      // https://umijs.org/plugin/umi-plugin-react.html
      'umi-plugin-react',
      {
        dva: true,
        antd: true,
        routes: {
          exclude: [
            /model\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /models\//,
            /components\//,
            /services\//,
            /chart\/Container\.js$/,
            /chart\/ECharts\/.+Component\.js$/,
            /chart\/ECharts\/.+ComPonent\.js$/,
            /chart\/ECharts\/theme\/.+\.js$/,
            /chart\/highCharts\/.+Component\.js$/,
            /chart\/highCharts\/mapdata\/.+\.js$/,
            /chart\/Recharts\/.+Component\.js$/,
            /chart\/Recharts\/Container\.js$/,
          ],
        },
        dll: {
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
        },
        hardSource: /* isMac */ process.platform === 'darwin',
        polyfills: ['ie11'],
      },
    ],
  ],
  // Theme for antd
  // https://ant.design/docs/react/customize-theme
  theme: './config/theme.config.js',

  // Webpack Configuration
  proxy: {
    '/api/v1/weather': {
      target: 'https://api.seniverse.com/',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/weather': '/v3/weather' },
    },
  },
  alias: {
    themes: resolve(__dirname, './src/themes'),
    components: resolve(__dirname, './src/components'),
    utils: resolve(__dirname, './src/utils'),
    config: resolve(__dirname, './src/utils/config'),
    enums: resolve(__dirname, './src/utils/enums'),
    services: resolve(__dirname, './src/services'),
    models: resolve(__dirname, './src/models'),
    routes: resolve(__dirname, './src/routes'),
  },
  urlLoaderExcludes: [/\.svg$/],
  ignoreMomentLocale: true,
  chainWebpack(config) {
    config.module
      .rule('svg')
      .test(/\.svg$/i)
      .use('svg-sprite-loader')
      .loader(require.resolve('svg-sprite-loader'))
  },
}
