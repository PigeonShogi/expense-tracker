const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000


app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/bootstrap', (req, res) => {
  res.render('bootstrap')
})

app.listen(port, () => {
  console.log(`app.js is running on http://localhost:${port}`)
})