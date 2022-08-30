if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Category = require('../category')
const Record = require('../record')
const User = require('../user')
const categoryJson = require('./default_data/category.json')
const recordJson = require('./default_data/record.json').data
const userJson = require('./default_data/user.json').data

const SEED_USER = {
  name: "廣志",
  email: "hiroshi@gmail.com",
  password: '1'
}

db.once('open', () => {
  console.log('Report from expenseSeeder: Mongodb connected!')
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
      }))
    .then(newUser => {
      console.log(newUser)
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

