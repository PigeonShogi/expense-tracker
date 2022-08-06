const express = require('express') // 載入 Express
const router = express.Router() // 載入 express.Router()
const Expense = require('../../models/expense')
const User = require('../../models/user')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, category, amount } = req.body
  const date = req.body.date.value
  console.log(date)
  const userId = req.user._id
  Expense.create({
    name, 
    date,
    category, 
    amount,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router