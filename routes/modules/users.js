const express = require('express') // 載入 Express
const router = express.Router() // 載入 express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../../models/user')

router.get('/tester', (req, res) => {
  res.render('tester')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已經登出系統')
  res.redirect('/users/login')
})

router.post('/login', passport.authenticate('local', {
  failureMessage: true,
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.post('/register', (req, res) => {
  const { email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不一致！請注意大小寫是否一致。' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      email,
      password,
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了！' })
      return res.render('register', {
        errors,
        email,
        password,
        confirmPassword
      })
    }

    return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        email,
        password: hash
      }))
      .then(() => res.redirect('login'))
      .catch(err => console.log(err))
  })
})

module.exports = router