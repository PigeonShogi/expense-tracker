const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  email: { type: String },
  password: { type: String },
  date: { type: Date, default: Date.now },
  // 以下是自己思考的編碼
  userId: {type: String},
})

module.exports = mongoose.model('User', userSchema) // mongoose.model(modelName, schema)