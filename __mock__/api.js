'use strict'

const express = require('express')
const router = express.Router()

const hello = (req, res) => {
  res.send('world')
}

router.get('/hello', hello)

module.exports = router
