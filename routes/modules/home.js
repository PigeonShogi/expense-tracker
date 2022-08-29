const express = require('express')
const Record = require('../../models/record')
const router = express.Router()
const dateConvert = require('../../utils/dateConvert')
const amountSum = require('../../utils/amountSum')
const { withSlash } = require('../../utils/dateConvert')

router.get('/tester', (req, res) => {
  res.render('tester')
})

router.post('/tester', (req, res) => {
  console.log(req.body)
  console.log(typeof (req.body.category))
  res.render('tester')
})


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
      const sum = amountSum(records)
      res.render('index', { records, sum })
    })
    .catch(err => console.error(err))
})

module.exports = router