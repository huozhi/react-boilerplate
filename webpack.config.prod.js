const url = require('url')
const path = require('path')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const config = require('./webpack.config')


module.exports = Object.assign({}, config, {
  entry: Object.assign(config.entry, {
    common: ['react', 'react-dom'],
  }),
  output: Object.assign({}, config.output, {
    filename: '[name].[hash].js',
  }),
  module: Object.assign({}, config.module, {
    loaders: config.module.loaders.concat([
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]),
  }),
  plugins: config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')},
      __DEV__: false,
    }),
    new ExtractPlugin('app.[contenthash:hex:20].css', {allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.[hash].js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {warnings: false},
      output: {comments: false},
    })
  ]),
})
