const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  date: { type: Date, default: Date.now },
  userId: { type: String },
})

module.exports = mongoose.model('User', userSchema) 