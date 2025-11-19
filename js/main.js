import { getAPIData } from "./modules/api.js"
import { displayData } from "./modules/dom.js"


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

