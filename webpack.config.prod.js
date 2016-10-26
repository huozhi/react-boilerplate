const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const config = require('./webpack.config')

module.exports = Object.assign(config, {
  output: Object.assign(config.output, {
    filename: '[name].[hash].js',
  }),
  module: Object.assign(config.module, {
    loaders: config.module.loaders.concat([
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
    ]),
  }),
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'index.html'),
      minify: false,
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
