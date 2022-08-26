const express = require('express') // 載入 Express
const expense = require('../../models/expense')
const router = express.Router() // 載入 express.Router()
const dateConvert = require('../../utils/dateConvert')
const amountSum = require('../../utils/amountSum')


router.get('/', (req, res) => {
  const userId = req.user._id // req.user 是在反序列化的時候取出的 user 資訊
  expense.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(expenses => {
      // console.log(expenses)
      const expenses_id = []
      // console.log(expenses_id)
      expenses.forEach(element => expenses_id.push(element._id))
      res.locals.expenses_id = expenses_id
      // console.log('res.locals.expenses_id ===', res.locals.expenses_id)
      const sum = amountSum(expenses)
      res.render('index', { expenses, sum })
    })
    // .then(expenses => {
    //   console.log('expenses ===', expenses)
    //   console.log('expenses[0]的type ===', typeof (expenses[0]))
    //   console.log('expenses[0].value ===', expenses[0].value)
    //   console.log('expenses[0]', expenses[0].date)
    //   console.log('date ===', dateConvert(expenses[0]))
    //   res.render('index', { expenses })
    // })
    .catch(err => console.error(err))
})

// router.post('/', (req, res) => {
//   const userId = req.user._id // req.user 是在反序列化的時候取出的 user 資訊
//   const { sort } = req.body
//   console.log('req.body === ', req.body)
//   console.log('typeOf(req.body) === ', typeof (req.body))
//   console.log('req.body.sort === ', sort)
//   console.log('req.body.sort 鍵值對 === ', req.body.entries())
//   console.log('req.body === ', req.body === { '”sort”': '交通出行' })
//   expense.find({ userId })
//     .lean()
//     .sort({ _id: 'asc' })
//     .then(expenses => {
//       const sum = amountSum(expenses)
//       res.render('index', { expenses, sum })
//     })
//     .catch(err => console.error(err))
// })

module.exports = router