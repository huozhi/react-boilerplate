'use strict'

const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const morgan = require('morgan')
const webpack = require('webpack')
const router = require('./__mock__/api')

global.__DEV__ = process.env.NODE_ENV !== 'production'

const port = process.env.PORT || 3000
const webpackConfig = __DEV__ ? require('./webpack.config.dev.js') : require('./webpack.config.prod.js')

const app = express()

const compiler = webpack(webpackConfig)
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false,
    chunkModules: false
  }
}))
app.use(require('webpack-hot-middleware')(compiler))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))

// cors middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type,X-Xsrftoken')
  res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,PUT,POST,DELETE,OPTIONS')
  next()
})

app.use(router)

app.get('*', (req, res) => {
  req.pipe(http.get({port}, r => {
    res.writeHead(r.statusCode, r.headers)
    r.pipe(res)
  }))
})

app.use((req, res) => {
  res.status(404).end()
})

app.listen(port, error => {
  if (error) {
    console.error(error)
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})
