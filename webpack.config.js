const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTemplate = require('html-webpack-template')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = (webpackConfig, env) => {
  const production = env === 'production'
  // FilenameHash
  webpackConfig.output.chunkFilename = '[name].[hash].js'

  if (production) {
    if (webpackConfig.module) {
    // ClassnameHash
      webpackConfig.module.rules.map((item) => {
        if (String(item.test) === '/\\.less$/' || item.test === '/\\.css/') {
          item.use.filter(iitem => iitem.loader === 'css')[0].options.localIdentName = '[hash:base64:5]'
        }
        return item
      })
    }
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })
    )
  }

  webpackConfig.plugins = webpackConfig.plugins.concat([
    new CopyWebpackPlugin([
      {
        from: 'src/public',
        to: production ? '../' : webpackConfig.output.outputPath,
      },
    ]),
    new HtmlWebpackPlugin({
      hash: true,
      mobile: true,
      title: 'antd-admin',
      inject: false,
      appMountId: 'root',
      template: `!!ejs-loader!${HtmlWebpackTemplate}`,
      filename: production ? '../index.html' : 'index.html',
      minify: {
        collapseWhitespace: true,
      },
      scripts: production ? null : ['/roadhog.dll.js'],
      meta: [
        {
          name: 'description',
          content: 'A admin dashboard application demo built upon Ant Design and Dva.js',
        }, {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
      ],
    }),
  ])

  // Alias
  webpackConfig.resolve.alias = {
    components: `${__dirname}/src/components`,
    utils: `${__dirname}/src/utils`,
    config: `${__dirname}/src/utils/config`,
    enums: `${__dirname}/src/utils/enums`,
    services: `${__dirname}/src/services`,
    models: `${__dirname}/src/models`,
    routes: `${__dirname}/src/routes`,
    themes: `${__dirname}/src/themes`,
  }

  return webpackConfig
}
