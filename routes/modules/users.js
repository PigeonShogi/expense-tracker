const express = require('express') // 載入 Express
const router = express.Router() // 載入 express.Router()

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/logout', (req, res) => {
  res.redirect('/users/login')
})

module.exports = router