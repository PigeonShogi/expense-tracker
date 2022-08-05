const mongoose = require('mongoose')
const { Schema } = mongoose

const expenseSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  // 加入關聯設定
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: false
  },
  // categoryId: Number,
})

module.exports = mongoose.model('Expense', expenseSchema) // mongoose.model(modelName, schema)