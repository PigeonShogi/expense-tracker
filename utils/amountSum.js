module.exports = function amountSum(expenses) {
  let sum = 0
  expenses.forEach(element => {
    sum += element.amount
  })
  // 回傳的數字以字串顯示，並加上千分位逗號。
  return sum.toString(10).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}