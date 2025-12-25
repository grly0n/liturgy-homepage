import { getCelebration } from "./api.js"

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


export function displayData(data) {
  let currentDate = new Date(Date.now())
  let dateString = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`
  console.log(`Displaying data for ${dateString}`)
  const dataPane = document.querySelector('.data')
  const celebrationInfo = document.querySelector('.celebrations')
  const celebration = getCelebration(data)
  let text = `${celebration['title']} / ${celebration['rank']}`
  celebrationInfo.textContent = text

  let backgroundColor = celebration['colour']
  if (backgroundColor == 'green') {
    backgroundColor = 'lightgreen'
  }

  // document.querySelector('div').style.backgroundColor = backgroundColor
  dataPane.style.backgroundColor = backgroundColor

  document.querySelector('.weekday').textContent = uppercase(data['weekday'])
  document.querySelector('.weeknum').textContent = data['season_week']
  document.querySelector('.season').textContent = uppercase(data['season'])
}

export function clearData() {
  const dataPane = document.querySelector('.data')
  // let dataCollection = dataPane.childNodes
  // console.log(dataCollection)
  // for (let index = 0; index < dataCollection.length; index++) {
  //   dataPane.removeChild(dataCollection[index])
  // }
  dataPane.innerHTML = ''
}


export function displayDataWeek(dataList) {
  for (const day of dataList) {
    // console.log(day)
    // displayData(day)
    createDayTile(day)
  }
}


export function createDayTile(data) {
  // console.log(data)
  const list = document.querySelector('.data')
  const tile = document.createElement('li')
  const tileDay = document.createElement('p')
  const tileText = document.createElement('p')
  const celebration = getCelebration(data)
  const date = new Date(data['date'])
  date.setDate(date.getDate() + 1)
  // console.log(date, data['date'])

  tileDay.textContent = `${uppercase(data['weekday'])}, ${MONTHS[date.getMonth()]} ${date.getDate()}`
  tileText.textContent = `${celebration['title']} / ${celebration['rank']}`
  tile.setAttribute('class', 'dayData')
  list.appendChild(tile)
  tile.appendChild(tileDay)
  tile.appendChild(tileText)
  let backgroundColor = celebration['colour']
  if (backgroundColor == 'green') {
    backgroundColor = 'lightgreen'
  } else if (backgroundColor == 'red') {
    backgroundColor = 'indianred'
  }
  tile.style.backgroundColor = backgroundColor
}


function uppercase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}