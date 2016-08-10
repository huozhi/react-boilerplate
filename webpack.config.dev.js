'use strict'

const webpack = require('webpack')
const config = require('./webpack.config')

const hotMiddlewareScript = 'webpack-hot-middleware/client'

const hotreloadEntry = (entry) => {
  return Object.keys(entry).reduce((result, key) => {
    result[key] = entry[key].concat([hotMiddlewareScript])
    return result
  }, {})
}


module.exports = Object.assign({}, config, {
  entry: hotreloadEntry(config.entry),
  output: Object.assign({}, config.output, {
    filename: '[name].js',
  }),
  devtool: 'eval-source-map',
  module: Object.assign({}, config.module, {
    loaders: config.module.loaders.concat([
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel',
      },
      {
        test: /\.css$/,
        include: /src/,
        loader: 'style!css!postcss',
      },
    ]),
  }),
  plugins: config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)},
      __DEV__: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
    }),
    // new ExtractPlugin('app.css', {allChunks: true}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]),
})
