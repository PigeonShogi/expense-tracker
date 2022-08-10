module.exports = function amountSum(expenses) {
  let sum = 0
  expenses.forEach(element => {
    sum += element.amount
  })
  return sum
}