
export default function (webpackConfig) {
  webpackConfig.module.rules.push({
    test: /\.svg$/i,
    use: [
      {
        loader: require.resolve('svg-sprite-loader'),
      },
    ],
  })

  return webpackConfig
};
