const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const devServerPort = 8080

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './index.html',
    minify: false
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }),
  new ExtractTextPlugin('style.css'),
]

const customizedMinialStats = {
  colors: true,
  modules: false,
  chunks: false,
  chunkModules: false,
  chunkOrigins: false,
}

const devServer = {
  hot: true,
  inline: true,
  port: devServerPort,
  stats: customizedMinialStats,
}

if (isProd) {
  plugins.push(
    new UglifyJsPlugin(),
  )
}

const config = {
  entry: [
    './src/index.css',
    './src/index.js',
  ],
  output: {
    publicPath: '/',
    filename: 'app.js',
    path: path.resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: ['react-hot-loader/babel'],
            },
          }
        ]
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      }
    ]
  },
  plugins,
  devServer,
  stats: customizedMinialStats,
}

module.exports = config
