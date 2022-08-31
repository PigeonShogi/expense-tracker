// 這個檔案執行後可產生 Category、Record、User 共三個資料表。
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Category = require('../category')
const Record = require('../record')
const User = require('../user')
const categoryJson = require('./default_data/category.json')
const recordJson = require('./default_data/record.json')
const userJson = require('./default_data/user.json')
// 這個函式可產出種子記錄與種子使用者。
function createSeedData(userArray, userArrayIndex, recordArray) {
  const start = userArray[userArrayIndex].start
  const end = userArray[userArrayIndex].end
  const target = recordArray.slice(start, end)
  db.once('open', () => {
    console.log('Report from recordSeeder: Mongodb connected!')
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(userArray[userArrayIndex].password, salt))
      .then(hash => {
        return User.create({
          name: userArray[userArrayIndex].name,
          email: userArray[userArrayIndex].email,
          password: hash
        })
      }
      )
      .then(newUser => {
        const userId = newUser._id
        return Promise.all(Array.from(
          target,
          value => {
            Record.create({
              name: value.name,
              date: value.date,
              categoryId: value.categoryId,
              amount: value.amount,
              userId
            })
          }
        ))
      })
      .then((done) => console.log('Seed user and seed record have been created!'))
      .catch(err => console.log(err))
  })
}
// 這個函式可產出種子類別
function createCategory(categoryArray) {
  db.once('open', () => {
    console.log('Report from recordSeeder: Mongodb connected!')
    return User.find()
      .then(user => {
        return Promise.all(Array.from(
          categoryArray,
          value =>
            Category.create({
              id: value.id,
              name: value.name
            })
        ))
      })
      .then(() => console.log('Seed category has been created!'))
      .catch(err => console.log(err))
  })
}

createSeedData(userJson.data, 0, recordJson.data)
createSeedData(userJson.data, 1, recordJson.data)
createCategory(categoryJson.data)