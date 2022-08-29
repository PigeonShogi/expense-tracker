// 將首頁顯示的每一筆支出之底色調整為：奇數筆底色較深，偶數筆底色較淺。
const divDark = document.querySelectorAll('.div-a-data-dark')
divDark.forEach(element => {
  if (Number(element.dataset.index) % 2 === 0) {
    element.classList.remove('div-a-data-dark')
    element.classList.add('div-a-data-light')
  }
})