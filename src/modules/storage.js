export function checkStorage(date) {
  if (!localStorage.getItem(date)) {
    console.log(`Data for ${date} not found in localStorage`)
    return false
  } else {
    console.log(`Data for ${date} found in localStorage`)
    return true
  }
}


export function saveToStorage(date, data) {
  console.log(`Saving data for ${date} to localStorage`)
  localStorage.setItem(date, data)
}


export function getFromStorage(date) {
  return localStorage.getItem(date)
}


export function removeFromStorage(date) {
  localStorage.removeItem(date)
}