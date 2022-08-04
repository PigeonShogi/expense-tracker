const express = require('express') // 載入 Express
const router = express.Router() // 載入 express.Router()
const passport = require('passport')
const User = require('../../models/user')

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/login', (req, res) => {
  console.log(res.locals.isAuthenticated)
  res.render('login')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.post('/register', (req, res) => {
  const { email, password, confirmPassword } = req.body
  const errors = []
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不一致！請注意大小寫是否一致。' })
  }
  if (errors.length) {
    // console.log('errors ===', errors)
    return res.render('register', {
      errors,
      email,
      password,
    })
  }
  return User.create({
    email,
    password,
  })
    .then(() => res.redirect('login'))
    .catch(err => console.log(err))
})

module.exports = router