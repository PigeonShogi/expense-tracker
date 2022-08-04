const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const routes = require('./routes')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000


app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'E-Tracker', // 在正式專案中，這裡應該設定環境變數，避免重要資訊曝光。
  resave: false, // 不在每次互動後強制將 session 更新到 session store 內部。
  saveUninitialized: true, // 強制將未初始化的 session 存回 session store。未初始化表示這個 session 是新的而且沒有被修改過，例如未登入的使用者的 session。
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)
app.use(flash())
// app.use((req, res, next) => {
//   next()
// })



app.listen(port, () => {
  console.log(`app.js is running on http://localhost:${port}`)
})