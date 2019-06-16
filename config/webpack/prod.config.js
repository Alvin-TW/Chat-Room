const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
  mode: 'production',
    plugins: [
      new CleanWebpackPlugin(['./dist'], {
        root: process.cwd()
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: false
          },
          sourceMap: false
        })
      ]
    }
})