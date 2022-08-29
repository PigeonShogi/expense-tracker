const express = require('express') // 載入 Express
const expense = require('../../models/expense')
const router = express.Router() // 載入 express.Router()
const dateConvert = require('../../utils/dateConvert')
const amountSum = require('../../utils/amountSum')


router.get('/', (req, res) => {
  const userId = req.user._id
  expense.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(expenses => {
      const expenses_id = []
      let expenses_serialNumber = 1
      expenses.forEach(element => {
        element.serialNumber = expenses_serialNumber
        expenses_serialNumber++
        // console.log(element)
        expenses_id.push(element._id)
        element.date = dateConvert(element.date)
      })
      res.locals.expenses_id = expenses_id
      const sum = amountSum(expenses)
      // console.log('expenses ===', expenses)
      res.render('index', { expenses, sum })
    })
    .catch(err => console.error(err))
})

module.exports = router