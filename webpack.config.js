'use strict'

const path = require('path')
const webpack = require('webpack')
const rucksack = require('rucksack-css')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev')}
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: 'common.js',
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(__dirname, 'src/index.html'),
    minify: false,
  }),
]

if (isProduction) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      output: { comments: false },
    })
  )
}

module.exports = {
  entry: {
    app: [path.join(__dirname, 'src/index.js')],
    common: [
      'react',
      'react-dom',
    ]
  },
  devtool: isProduction ? false : 'eval',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        include: /src/,
        loaders: [
          'style',
          'css?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
          'postcss'
        ]
      },
      {
        test: /\.css$/,
        exclude: /src/,
        loader: 'style!css'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot','babel']
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: webpack => [
    rucksack({
      autoprefixer: true,
    }),
    require('postcss-nested'),
    require('postcss-import'),
    require('postcss-custom-media'),
    require('postcss-custom-properties'),
  ],
  plugins,
  devServer: {
    contentBase: 'src',
    hot: true,
    inline: true,
    stats: {
      colors: true,
      chunks: false,
      chunkModules: false,
    }
  }
}
