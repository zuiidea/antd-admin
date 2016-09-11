const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const babelLoaderConfig = {
  presets: ['es2015', 'stage-0', 'react'],
  plugins: [
    ['antd', {
      'style': true
    }]
  ],
};

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/index.js'
  ],

  output: {
    path: __dirname + '/dist',
    filename: 'js/bundle.js',
  },

  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js', '.jsx'],
    alias: {
      antdcss: 'antd/dist/antd.min.css',
    },
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel-loader?' + JSON.stringify(babelLoaderConfig)],
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
    }, ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Ant Design Admin',
      filename: 'index.html',
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'production' ? 'false' : 'true')),
    }),
  ],
};
