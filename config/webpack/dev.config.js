const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/index'
  ],
  output: {
    filename: 'main.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})