const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const User = require('../../models/user')
const dateConvert = require('../../utils/dateConvert')


router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, category, amount, date } = req.body
  const userId = req.user._id
  return Expense.create({
    name,
    date,
    category,
    amount,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  mark = '-'
  Expense.findOne({ _id, userId })
    .lean()
    .then(expense => {
      console.log('expense ===', expense)
      expense.date = dateConvert(expense.date, mark)
      res.render('edit', { expense })
    })
    .catch(err => console.error(err))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Expense.findOne({ _id, userId })
    .then(expense => {
      expense = Object.assign(expense, req.body)
      return expense.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Expense.findOne({ _id, userId })
    .then(expense => {
      console.log(expense)
      expense.remove()
    }
    )
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router