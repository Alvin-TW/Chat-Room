const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                exclude: [/node_modules/]
            }
        ]
    },
     plugins: [
        new CleanWebpackPlugin(['./dist'], { root: process.cwd() }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
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
}