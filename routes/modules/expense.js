const express = require('express') // 載入 Express
const router = express.Router() // 載入 express.Router()
const Expence = require('../../models/expense')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, category, amount } = req.body
  Expence.create({
    name, date: Date(), category, amount
  })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router