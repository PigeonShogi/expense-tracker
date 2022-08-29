const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
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
  Expense.findById(id)
    .lean()
    .then(expense => {
      console.log('expense.date ===', expense.date)
      console.log('expense.category ===', expense.category)
      res.render('edit', { expense })
    })
    .catch(err => console.error(err))
})

module.exports = router