'use strict'

const path = require('path')
const webpack = require('webpack')
const rucksack = require('rucksack-css')

const isProduction = process.env.NODE_ENV === 'production'

const plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev')}
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
]

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warning: false },
    output: { comments: false },
  }))
}

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    jsx: './index.js',
    html: './index.html',
    vendor: [
      'react',
      'react-dom',
    ]
  },
  devtool: isProduction ? false : 'eval',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(html|png|jpg|svg)$/,
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
    extensions: ['', '.js', '.js']
  },
  postcss: [
    rucksack({
      autoprefixer: true,
    }),
    require('postcss-nested'),
    require('postcss-import'),
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev')}
    })
  ],
  devServer: {
    contentBase: './src',
    hot: true,
    inline: true,
    stats: {
      colors: true,
      chunks: false,
      chunkModules: false,
    }
  }
}
