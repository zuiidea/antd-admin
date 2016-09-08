const webpack = require('webpack');

const babelLoaderConfig = {
  presets: ['es2015', 'stage-0', 'react'],
  plugins: [['antd', {'style': true}]],
};

module.exports = {
  entry: [
    // 可能需要polyfill
    './src/index.js',
  ],

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.min.js',
    // publicPath: 'http://mycdn.com/', // require时用来生成图片的地址
  },

  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        // 删除一些debug语句
        loaders: ['babel-loader?' + JSON.stringify(babelLoaderConfig), 'strip-loader?strip[]=logger.debug,strip[]=console.log,strip[]=console.debug'],
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        loader: 'style!css',
      }, {
        test: /\.less$/,
        loader: 'style!css!less',
      }, {
        test: /\.(png|jpg|svg)$/,
        loader: 'url?limit=25000',
      },
    ],
  },

  plugins: [
    // 代码压缩
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {warnings: false},
    }),

    // 抽离公共部分
    // webpack.optimize.CommonsChunkPlugin

    new webpack.optimize.DedupePlugin(),
    // 比对id的使用频率和分布来得出最短的id分配给使用频率高的模块
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    // 允许错误不打断程序
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'production' ? 'false' : 'true')),
    }),
  ],
};
