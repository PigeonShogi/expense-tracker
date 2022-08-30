if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Category = require('../category')
const Record = require('../record')
const User = require('../user')
const categoryJson = require('./default_data/category.json').data
const recordJason = require('./default_data/record.json').data
const userJason = require('./default_data/user.json').data

db.once('open', () => {
  console.log('Report from expenseSeeder: Mongodb connected!')
  return User.find()
    .then(user => {
      return Promise.all(Array.from(
        categoryJson,
        value =>
          Category.create({
            id: value.id,
            name: value.name
          })
      ))
    })
    .then(() => console.log('Expense-Tracker Seeder Done!'))
    .catch(err => console.log(err))
    .finally(() => db.close())
})

