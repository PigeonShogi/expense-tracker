const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/bootstrap', (req, res) => {
  res.render('bootstrap')
})

module.exports = router