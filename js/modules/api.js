import { checkStorage, saveToStorage, removeFromStorage, getFromStorage } from "./storage.js"

const API_URL = "http://calapi.inadiutorium.cz/api/v0/en/calendars/general-en/";



export async function getAPIData(day) {
  let currentDate = new Date(Date.now())
  if (day == 'tomorrow') {
    currentDate.setDate(currentDate.getDate() + 1)
  } else if (day == 'yesterday') {
    currentDate.setDate(currentDate.getDate() - 1)
  }
  const dateString = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`


  // Remove when done testing localStorage
  // removeFromStorage(dateString)

  if (!checkStorage(dateString)) {
    const response = await fetch(API_URL + dateString)
    if (response.ok) {
      const json_response = await response.json()
      saveToStorage(dateString, JSON.stringify(json_response))
      return json_response
    }
    throw new Error('Data could not be acquired for ' + dateString)
  } else {
    console.log(`Fetching data for ${dateString} from localStorage`)
    return JSON.parse(getFromStorage(dateString))
  }

}


export function getCelebration(celebrations) {
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