const express = require('express') // 載入 Express
const router = express.Router() // 載入 express.Router()

router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router