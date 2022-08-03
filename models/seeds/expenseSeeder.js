if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Expense = require('../expense')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_Expense = {
  name: '午餐',
  date: Date.now(),
  amount: 60,
}

db.once('open', () => {
  console.log('Report from expenseSeeder: Mongodb connected!')
  Expense.create(SEED_Expense)
    .then(() => console.log('Expense-Tracker Seeder Done!'))
    .catch(err => console.log(err))
    .finally(() => db.close())
})

