const divDark = document.querySelectorAll('.div-a-data-dark')
const icon = document.querySelectorAll('i')
const select = document.querySelector('select')
const optionAll = document.querySelectorAll('option')
const spanAll = document.querySelectorAll('span')

// 將首頁顯示的每一筆支出之底色調整為：奇數筆底色較深，偶數筆底色較淺。
divDark.forEach(element => {
  if (Number(element.dataset.index) % 2 === 0) {
    element.classList.remove('div-a-data-dark')
    element.classList.add('div-a-data-light')
  }
})

// 將預設的圖示保留或抽換成正確圖示
/*
家居物業 fa-house-chimney
交通出行 fa-van-shuttle
休閒娛樂 fa-face-grin-beam
餐飲食品 fa-utensils
其他    fa-utensils
*/
icon.forEach(element => {
  if (element.dataset.category === '1') {
    element.classList.remove('fa-utensils')
    element.classList.add('fa-house-chimney')
  } else if (element.dataset.category === '2') {
    element.classList.remove('fa-utensils')
    element.classList.add('fa-van-shuttle')
  } else if (element.dataset.category === '3') {
    element.classList.remove('fa-utensils')
    element.classList.add('fa-face-grin-beam')
  } else if (element.dataset.category === '5') {
    element.classList.remove('fa-utensils')
    element.classList.add('fa-pen')
  }
})

// 設定修改支出頁面的下拉式選單之預設值，使其等於修改前的支出類別。
if (select.dataset.default === '2') { optionAll[1].setAttribute('selected', 'selected') }
else if (select.dataset.default === '3') { optionAll[2].setAttribute('selected', 'selected') }
else if (select.dataset.default === '4') { optionAll[3].setAttribute('selected', 'selected') }
else if (select.dataset.default === '5') { optionAll[4].setAttribute('selected', 'selected') }

// 將首頁各筆支出加上千分位逗號
spanAll.forEach(element => {
  if (element.dataset.info === 'amount') {
    element.innerText = element.innerText.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
})