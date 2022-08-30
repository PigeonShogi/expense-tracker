// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }
// const bcrypt = require('bcryptjs')
// const db = require('../../config/mongoose')
// const Category = require('../category')
// const Record = require('../record')
// const User = require('../user')
// const categoryJson = require('./default_data/category.json').data
// const recordJason = require('./default_data/record.json').data
// const userJason = require('./default_data/user.json').data

const CATEGORY = {
  家居物業: "fa-house-chimney",
  交通出行: "fa-solid record-icon fa-van-shuttle",
  休閒娛樂: "fa-solid record-icon fa-face-grin-beam",
  餐飲食品: "fa-solid record-icon fa-utensils",
  其他: "fa-solid record-icon fa-pen"
}

module.exports = CATEGORY