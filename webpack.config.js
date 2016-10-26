const path = require('path')
const webpack = require('webpack')
const joinPath = path.join.bind(null, __dirname)

module.exports = {
  entry: {
    app: [joinPath('src/index.js')],
    common: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'redux-actions',
      'redux-thunk',
      'redux-promise-middleware',
    ],
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
    require('postcss-cssnext'),
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
