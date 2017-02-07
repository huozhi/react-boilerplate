const path = require('path')
const webpack = require('webpack')
const merge = ('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const config = require('./webpack.config')

module.exports = merge(config, {
  output: {
    filename: '[name].[hash].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        include: /src/,
        loader: ExtractPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:3]!postcss'),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractPlugin('app.[contenthash:hex:20].css', {allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.[hash].js',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {warnings: false},
      output: {comments: false},
    }),
  ],
})
