'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: {
    app: [path.join(__dirname, 'src/index.js')],
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpe?g)$/,
        loader: 'file?name=images/[name].[ext]',
      },
    ]
  },
  postcss: webpack => [
    require('postcss-import')({addDependencyTo: webpack}),
    require('postcss-nested'),
    require('postcss-custom-media'),
    require('postcss-custom-properties'),
  ],
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'index.html'),
      minify: false,
    }),
  ],
  devServer: {
    hot: true,
    inline: true,
    stats: {
      colors: true,
      chunks: false,
      chunkModules: false,
    }
  }
}
