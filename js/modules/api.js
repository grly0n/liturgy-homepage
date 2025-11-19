const API_URL = "http://calapi.inadiutorium.cz/api/v0/en/calendars/general-en/";

export async function getAPIData(date) {
  const response = await fetch(API_URL + date)
  if (response.ok) {
    return response.json()
  }
  throw new Error('Data could not be acquired for ' + date)
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