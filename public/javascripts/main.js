const divDark = document.querySelectorAll('.div-a-data-dark')
const icon = document.querySelectorAll('i')


// 將首頁顯示的每一筆支出之底色調整為：奇數筆底色較深，偶數筆底色較淺。
divDark.forEach(element => {
  if (Number(element.dataset.index) % 2 === 0) {
    element.classList.remove('div-a-data-dark')
    element.classList.add('div-a-data-light')
  }
})

// 將預設的圖示保留或抽換成正確圖示
icon.forEach(element => {
  if (element.dataset.category === '家居物業') {
    element.classList.remove('fa-utensils')
    element.classList.add('fa-house-chimney')
  } else if (element.dataset.category === '交通出行') {
    element.classList.remove('fa-utensils')
    element.classList.add('fa-van-shuttle')
  } else if (element.dataset.category === '休閒娛樂') {
    element.classList.remove('fa-utensils')
    element.classList.add('fa-face-grin-beam')
  } else if (element.dataset.category === '其他') {
    element.classList.remove('fa-utensils')
    element.classList.add('fa-pen')
  }

})