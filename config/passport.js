const bcrypt = require('bcryptjs')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  },
    (req, email, password, done) => {
      return User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, req.flash('error_msg', '您輸入的帳號尚未註冊'))
          }
          return bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) {
                return done(null, false, req.flash('error_msg', '密碼有誤，請注意英文大小寫是否正確。'))
              }
              return done(null, user)
            })
        })
        .catch(err => done(err, false))
    }))

  // 設定 Google 第三方登入策略

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}