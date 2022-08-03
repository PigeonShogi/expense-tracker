const mongoose = require('mongoose')
const { Schema } = mongoose

const expenseSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  // userId: { type: Number },
  // categoryId: Number,
})

module.exports = mongoose.model('Expense', expenseSchema) // mongoose.model(modelName, schema)