import {
  PicrossEditor,
  PicrossGame
} from './Picross.js';
import Timer from './Timer.js'
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


function onClickCreateTableButton () {
  picrossEditorInstance = new PicrossEditor(
    document.getElementById(tableContainerId)
  )
  const colNumber = parseInt(document.getElementById('col_number').value)
  const lineNumber = parseInt(document.getElementById('line_number').value)
  picrossEditorInstance.createTable(colNumber, lineNumber)
}

function onClickExportPicrossButton () {
  const picross = {
    title: document.getElementById('title').value,
    ...picrossEditorInstance.computeDataTable()
  }
  const preNode = document.querySelector(`#${creationContainerId} pre`)
  emptyNode(preNode)
  preNode.innerHTML = JSON.stringify(picross)
}

function loadDataPicross () {
  const dataContainer = document.getElementById(dataContainerId)
  emptyNode(dataContainer)
  fetch('/data/picross.json')
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
            document.getElementById(victoryContainerId).className = ''
            timer.stopTimer()
          })
        }
        dataContainer.appendChild(liNode)
      })
    })
}

loadDataPicross()