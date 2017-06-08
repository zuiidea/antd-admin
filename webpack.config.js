module.exports = (webpackConfig) => {
  // FilenameHash
  webpackConfig.output.chunkFilename = '[name].[hash].js' // http://webpack.github.io/docs/configuration.html#output-chunkfilename

  // ClassnameHash
  const cssLoaderOption = {
    importLoaders: 1,
    modules: true,
    localIdentName: '[hash:base64:5]',
  }
  const cssLoaders = webpackConfig.module.loaders[3].loader.split('!')
  cssLoaders.map(item => {
    if (item.startsWith('css')) {
      return `css?${JSON.stringify(cssLoaderOption)}`
    }
    return item
  })
  webpackConfig.module.loaders[3].loader = cssLoaders.join('!')

  // PreLoaders
  webpackConfig.module.preLoaders = [{
    test: /\.js$/,
    enforce: 'pre',
    loader: 'eslint',
  }]

  return webpackConfig
}
