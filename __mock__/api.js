'use strict'

const express = require('express')
const router = express.Router()

const hello = (req, res) => {
  res.send('world')
}

const notifications = (req, res) => {
  setTimeout(() => {
    res.send('async notifications')
  }, 1500)
}

router.get('/hello', hello)
router.get('/notifications', notifications)

module.exports = router
