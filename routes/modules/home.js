const express = require('express')
const Record = require('../../models/record')
const router = express.Router()
// dateConvert 函式可將 Date Object 轉換為指定的日期格式
const dateConvert = require('../../utils/dateConvert')
// amountSum 函式可計算支出總和
const amountSum = require('../../utils/amountSum')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      const mark = '/'
      // 賦予每一筆支出 serial number，對應到 index.hbs 的 data-index="{{this.serialNumber}}"。之後用 data-index 與 DOM 控制 CSS。
      let records_serialNumber = 1
      records.forEach(element => {
        element.serialNumber = records_serialNumber
        records_serialNumber++
        element.date = dateConvert(element.date, mark)
      })
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
  /*
  以下有兩個名稱相似的變數，在此簡單說明。
  records：比對過支出類別的支出
  record：比對前的支出
  */
  let records = []
  return Record.find({ userId })
    .lean()
    .then(record => {
      records = record.filter(element => { return element.categoryId === sort })
    })
    .then(() => {
      records.forEach(element => { element.date = dateConvert(element.date, mark) })
      const totalAmount = amountSum(records)
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})

module.exports = router