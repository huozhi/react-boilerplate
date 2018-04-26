const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const resolve = path.resolve.bind(null, __dirname)

const isProd = process.env.NODE_ENV === 'production'

const devServerPort = 8080

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './index.html',
    minify: false
  }),
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
    new UglifyJsPlugin()
  )
}

module.exports = {
  entry: {
    bundle: resolve('src/index.js'),
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{loader: 'babel-loader'}]
      },
      {
        test: /\.css/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },
  plugins,
  devServer,
  mode: 'none',
  stats: customizedMinialStats,
}