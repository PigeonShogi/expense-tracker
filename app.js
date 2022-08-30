const bodyParser = require('body-parser')
const express = require('express')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')
// const { rawListeners } = require('./models/user')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000


app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(session({
  name: 'dadExpense.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))
app.use(bodyParser.urlencoded({ extended: true }))

usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})
app.use(routes)



app.listen(port, () => {
  console.log(`app.js is running on http://localhost:${port}`)
})