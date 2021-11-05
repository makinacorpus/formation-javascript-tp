import {
  PicrossEditor,
  PicrossGame
} from './Picross.js';
import { Timer } from './Timer.js'
import './style.css'

const dataContainerId = 'data-container'
const tableContainerId = 'table-container'
const creationContainerId = 'creation-container'
const victoryContainerId = 'victory-container'
const timerContainer = document.getElementById('timer-container')

const timer = new Timer(timerContainer)

let picrossEditorInstance = null
let picrossGameInstance = null

function emptyNode (node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

window.onClickCreateTableButton = function () {
  picrossEditorInstance = new PicrossEditor(
    document.getElementById(tableContainerId)
  )
  const colNumber = parseInt(document.getElementById('col_number').value)
  const lineNumber = parseInt(document.getElementById('line_number').value)
  picrossEditorInstance.createTable(colNumber, lineNumber)
}

window.onClickExportPicrossButton = function () {
  const picross = {
    title: document.getElementById('title').value,
    ...picrossEditorInstance.computeDataTable()
  }
  const preNode = document.querySelector(`#${creationContainerId} pre`)
  emptyNode(preNode)
  preNode.innerHTML = JSON.stringify(picross)
}

function displayVictory(timeInSeconds) {
  const container = document.getElementById(victoryContainerId)
  emptyNode(container)
  const h1 = document.createElement('h1')
  h1.innerText = 'Victoire !!!'
  container.appendChild(h1)
  const p = document.createElement('p')
  p.innerText = 'Temps réalisé : ' + timeInSeconds + ' s'
  container.appendChild(p)
  const pHighscores = document.createElement('p')
  pHighscores.innerText = "Meilleurs temps \n"
  const currentPicrossTitle = picrossGameInstance._picrossData.title.replace(/ /, '')
  const highscoresString = localStorage.getItem('picross-' + currentPicrossTitle)
  const highscores = highscoresString ? JSON.parse(highscoresString) : []
  pHighscores.innerText += highscores.reduce(
    (accumulator, currentValue) => 
      accumulator.concat('\n ' + currentValue.date + ' : ' + currentValue.time + 's' )
  , "")
  container.appendChild(pHighscores)
  localStorage.setItem(
    'picross-' + currentPicrossTitle, 
    JSON.stringify(highscores.concat({
      time: timeInSeconds,
      date: new Date()
    }))
  )
  container.className = ''

}

function loadDataPicross () {
  const dataContainer = document.getElementById(dataContainerId)
  emptyNode(dataContainer)
  fetch('../../data/picross.json')
    .then(response => (response.json()))
    .then(picrossArray => {
      picrossArray.forEach(currentPicross => {
        const liNode = document.createElement('li')
        liNode.innerText = currentPicross.title
        liNode.style = 'cursor: pointer;'
        liNode.onclick = (e) => {
          document.getElementById(victoryContainerId).className = 'd-none'
          const container = document.getElementById(tableContainerId)
          picrossGameInstance = new PicrossGame(container, currentPicross)
          picrossGameInstance.createTable()
          timer.startTimer()
          picrossGameInstance.onFinished(() => {
            timer.stopTimer()
            displayVictory(timer.currentTime)
          })
        }
        dataContainer.appendChild(liNode)
      })
    })
}

loadDataPicross()