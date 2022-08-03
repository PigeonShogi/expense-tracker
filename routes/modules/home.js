const express = require('express') // 載入 Express
const router = express.Router() // 載入 express.Router()


router.get('/', (req, res) => {
  res.render('index')
})

router.get('/bootstrap', (req, res) => {
  res.render('bootstrap')
})

module.exports = router