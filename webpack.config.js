'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const joinPath = path.join.bind(null, __dirname)


module.exports = {
  entry: {
    app: [joinPath('src/index.js')],
  },
  output: {
    publicPath: '/',
    path: joinPath('dist'),
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpe?g)$/,
        loader: 'file?name=images/[name].[ext]',
      },
    ],
  },
  eslint: {
    configFile: joinPath('.eslintrc'),
  },
  preLoaders: [
    {
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/,
    },
  ],
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
    },
  },
}
