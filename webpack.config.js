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
  cssLoaders[1] = `css?${JSON.stringify(cssLoaderOption)}`
  webpackConfig.module.loaders[3].loader = cssLoaders.join('!')

  return webpackConfig
}
