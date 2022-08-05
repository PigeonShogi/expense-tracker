const express = require('express') // 載入 Express
const router = express.Router() // 載入 express.Router()

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  res.render('new')
})

module.exports = router