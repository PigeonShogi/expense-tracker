const mongoose = require('mongoose')
const { Schema } = mongoose

const expenseSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  // 加入關聯設定
  userId: {
    type: Schema.Types.ObjectId, // 設定參照對象
    ref: 'User', // 設定參照對象
    index: true,
    required: true
  },
  // categoryId: Number,
})

module.exports = mongoose.model('Expense', expenseSchema) // mongoose.model(modelName, schema)