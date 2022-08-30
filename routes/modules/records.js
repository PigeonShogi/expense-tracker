const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const dateConvert = require('../../utils/dateConvert')


router.get('/new', (req, res) => {
  const mark = '-'
  const date = dateConvert(new Date(), mark)
  res.render('new', { date })
})

router.post('/new', (req, res) => {
  const { name,categoryId, amount, date } = req.body
  const userId = req.user._id
  return Record.create({
    name,
    date,
    categoryId,
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
  Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      console.log('record ===', record)
      record.date = dateConvert(record.date, mark)
      res.render('edit', { record })
    })
    .catch(err => console.error(err))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => {
      console.log(record)
      record.remove()
    }
    )
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router