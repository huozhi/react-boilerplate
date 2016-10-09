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
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:3]!postcss',
      },
    ]),
  }),
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': {NODE_ENV: JSON.stringify(`development`)},
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
})
