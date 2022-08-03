const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  email: { type: String },
  password: { type: String },
  date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema) // mongoose.model(modelName, schema)