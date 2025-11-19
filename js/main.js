const API_URL = "http://calapi.inadiutorium.cz/api/v0/en/calendars/general-en/";


async function getAPIData(date) {
  const response = await fetch(API_URL + date)
  if (response.ok) {
    return response.json()
  }
  throw new Error('Data could not be acquired for ' + date)
}

function uppercase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}


function displayData(data) {
  const dataPane = document.querySelector('.data')
  const celebrationInfo = document.querySelector('.celebrations')
  const celebration = getCelebration(data['celebrations'])
  text = `${celebration['title']} / ${celebration['rank']}`
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


function getCelebration(celebrations) {
  let min_rank = 999
  let current_celebration = {}
  for (const celebration of celebrations) {
    if (celebration['rank_num'] < min_rank) {
      min_rank = celebration['rank_num']
      current_celebration = celebration
    }
  }
  return current_celebration
}


const button1 = document.querySelector('.today')
const button2 = document.querySelector('.tomorrow')
const button3 = document.querySelector('.yesterday')
let buttons = [button1, button2, button3]

for (const button of buttons) {
  button.addEventListener('click', function (e) {
    getAPIData(this.className)
      .then((result) => displayData(result))
  })
}

