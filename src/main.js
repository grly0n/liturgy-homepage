import { getAPIData } from "./modules/api.js"
import { displayData, clearData, createDayTile, displayDataWeek } from "./modules/dom.js"


const button1 = document.querySelector('.today')
const button2 = document.querySelector('.tomorrow')
const button3 = document.querySelector('.yesterday')
const button4 = document.querySelector('.week')
const button5 = document.querySelector('.month')

// Today
button1.addEventListener('click', function () {
  clearData()
  getAPIData(new Date())
    .then((result) => createDayTile(result))
})

// Tomorrow
button2.addEventListener('click', function () {
  let tomorrow = new Date()
  tomorrow.setDate(new Date().getDate() + 1)
  clearData()
  getAPIData(tomorrow)
    .then((result) => createDayTile(result))
})

// Yesterday
button3.addEventListener('click', function () {
  let yesterday = new Date()
  yesterday.setDate(new Date().getDate() - 1)
  clearData()
  getAPIData(yesterday)
    .then((result) => createDayTile(result))
})

// Next week (including today)
button4.addEventListener('click', async function (e) {
  let startDate = new Date()
  let endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 7)

  clearData()
  const weekData = []
  for (let currentDay = new Date(startDate); currentDay <= endDate; currentDay.setDate(currentDay.getDate() + 1)) {
    let data = await getAPIData(currentDay)
    weekData.push(data)
  }
  // console.log(weekData.length)
  displayDataWeek(weekData)
})

// Next month (including today)
button5.addEventListener('click', async function (e) {
  let startDate = new Date()
  let endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 30)

  clearData()
  const monthData = []
  for (let currentDay = new Date(startDate); currentDay <= endDate; currentDay.setDate(currentDay.getDate() + 1)) {
    let data = await getAPIData(currentDay)
    monthData.push(data)
  }

  displayDataWeek(monthData)
})