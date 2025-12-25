import { getCelebration } from "./api.js"

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export function clearData() {
  const dataPane = document.querySelector('.data')
  dataPane.innerHTML = ''
}


export function displayDataList(dataList) {
  for (const day of dataList) {
    createDayTile(day)
  }
}


export function createDayTile(data) {
  const list = document.querySelector('.data')
  const tile = document.createElement('li')
  const tileDay = document.createElement('p')
  const tileText = document.createElement('p')
  const celebration = getCelebration(data)
  const date = new Date(data['date'])
  date.setDate(date.getDate() + 1)

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