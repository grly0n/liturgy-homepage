import { getCelebration } from "./api.js"


export function displayData(data) {
  console.log(`Displaying data for ${data['date']}`)
  const dataPane = document.querySelector('.data')
  const celebrationInfo = document.querySelector('.celebrations')
  const celebration = getCelebration(data['celebrations'])
  let text = `${celebration['title']} / ${celebration['rank']}`
  celebrationInfo.textContent = text

  let backgroundColor = celebration['colour']
  if (backgroundColor == 'green') {
    backgroundColor = 'lightgreen'
  }

  document.querySelector('div').style.backgroundColor = backgroundColor

  document.querySelector('.weekday').textContent = uppercase(data['weekday'])
  document.querySelector('.weeknum').textContent = data['season_week']
  document.querySelector('.season').textContent = uppercase(data['season'])
}


function uppercase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}