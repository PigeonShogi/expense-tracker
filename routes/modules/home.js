const express = require('express')
const Record = require('../../models/record')
const router = express.Router()
const dateConvert = require('../../utils/dateConvert')
const amountSum = require('../../utils/amountSum')
const { withSlash } = require('../../utils/dateConvert')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      const mark = '/'
      const records_id = []
      let records_serialNumber = 1
      records.forEach(element => {
        element.serialNumber = records_serialNumber
        records_serialNumber++
        records_id.push(element._id)
        element.date = dateConvert(element.date, mark)
      })
      res.locals.records_id = records_id
      const totalAmount = amountSum(records)
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.error(err))
})


router.post('/', (req, res) => {
  const sort = Number(req.body.sort)
  if (!sort) { res.redirect('/') }
  const userId = req.user._id
  const mark = '/'
  let records = []
  return Record.find({ userId })
    .lean()
    .then(record => {
      records = record.filter(element => {
        return element.categoryId === sort
      }
      )
    })
    .then(() => {
      records.forEach(element => {
        element.date = dateConvert(element.date, mark)
      })
      const totalAmount = amountSum(records)
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})

module.exports = router