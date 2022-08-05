const express = require('express') // 載入 Express
const expense = require('../../models/expense')
const router = express.Router() // 載入 express.Router()


router.get('/', (req, res) => {
  const userId = req.user._id // req.user 是在反序列化的時候取出的 user 資訊
  expense.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(expenses => res.render('index', { expenses }))
    .catch(err => console.error(err))
})

router.get('/bootstrap', (req, res) => {
  res.render('bootstrap')
})

module.exports = router