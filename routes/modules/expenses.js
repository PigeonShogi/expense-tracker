const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const dateConvert = require('../../utils/dateConvert')
// const User = require('../../models/user')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, category, amount } = req.body
  const date = req.body.date
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

router.get('/:id/edit/', (req, res) => {
  const { id } = req.params
  mark = '-'
  Expense.findById(id)
    .lean()
    .then(expense => {
      expense.date = dateConvert(expense.date, mark)
      res.render('edit', { expense })
    })
    .catch(err => console.error(err))
})

module.exports = router