const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const router = require('./routes')

const app = express()
const port = process.env.PORT || 3000


app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)


app.listen(port, () => {
  console.log(`app.js is running on http://localhost:${port}`)
})