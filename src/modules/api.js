import { checkStorage, saveToStorage, removeFromStorage, getFromStorage } from "./storage.js"

const API_URL = "http://calapi.inadiutorium.cz/api/v0/en/calendars/general-en/";


function singleDay(day) {
  return day in ['today', 'tomorrow', 'yesterday']
}


export async function getAPIData(day) {
  const dateString = `${day.getFullYear()}/${day.getMonth() + 1}`
  // console.log(`Desired day: ${day}`)


  // Remove when done testing localStorage
  // removeFromStorage(dateString)

  if (!checkStorage(dateString)) {
    const response = await fetch(API_URL + dateString)
    if (response.ok) {
      const json_response = await response.json()
      saveToStorage(dateString, JSON.stringify(json_response))
      if (singleDay(day)) return json_response[day.getDate() - 1]
      else return json_response
    }
    throw new Error('Data could not be acquired for ' + dateString)
  } else {
    // console.log(`Fetching data for ${day} from localStorage`)
    return JSON.parse(getFromStorage(dateString))[day.getDate() - 1]
  }
}


export function getCelebration(data) {
  let min_rank = 999
  let current_celebration = {}
  for (const celebration of data['celebrations']) {
    if (celebration['rank_num'] < min_rank) {
      min_rank = celebration['rank_num']
      current_celebration = celebration
    }
  }
  return current_celebration
}


export function getWeeklyAPIData() {
  // let currentDate = new Date(Date.now())
  let currentDate = new Date('November 12, 2025')
  let lastSunday = currentDate.getDate() - (currentDate.getDay())
  currentDate.setDate(lastSunday)
  for (let i = 0; i < 7; i += 1) {
    console.log(`Requesting data for ${currentDate}`)
    currentDate.setDate(currentDate.getDate() + 1)
  }
}