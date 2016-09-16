const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const babelLoaderConfig = {
  presets: ['es2015', 'stage-0', 'react'],
  plugins: [['antd', {'style': true}]],
};

module.exports = {
  entry: [
    './src/index.js',
  ],

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    // publicPath: 'http://mycdn.com/',
  },

  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader?' + JSON.stringify(babelLoaderConfig), 'strip-loader?strip[]=logger.debug,strip[]=console.log,strip[]=console.debug'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url?limit=25000',
      },{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      },
    ],
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {warnings: false},
    }),
    new HtmlWebpackPlugin({
      title: 'Ant Design Admin',
      filename: 'index.html',
      template: './src/index.html'
    }),
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'production' ? 'false' : 'true')),
    }),
  ],
};
