const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index'
    ],
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
            	test: /\.(sass|scss)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				}),
				exclude: [/node_modules/]
			}
        ]
    },
     plugins: [
        new CleanWebpackPlugin(['./dist'], { root: process.cwd() }),
        new webpack.optimize.UglifyJsPlugin({
      		beautify: false,
      		comments: false,
			sourceMap: false,
      		compress: {
        		warnings: false
      		},
    	}),
		new webpack.LoaderOptionsPlugin({
     		 minimize: true
    	}),
    	new HtmlWebpackPlugin({
    		template: './index.html'
    	}),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
		})
    ]
}