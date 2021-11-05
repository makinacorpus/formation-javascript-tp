function emptyNode (node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

export class PicrossEditor {
  constructor (container) {
    this._container = container
  }

  _emptyNode = emptyNode

  createTable = function createTable (colNumber, lineNumber) {
    this._emptyNode(this._container)
    const table = document.createElement('table')
    for (let i = 0; i < lineNumber + 1; i++) {
      const currentRow = document.createElement('tr')
      for (let j = 0; j < colNumber + 1; j++) {
        const currentCell = document.createElement('td')
        if (i > 0 && j > 0) {
          currentCell.onclick = this._toggleCellState
        }
        currentRow.appendChild(currentCell)
      }
      table.appendChild(currentRow)
    }
    this._container.appendChild(table)
  }

  _isCellEnabled = function _isCellEnabled (node) {
    return node.className === 'selected'
  }

  _toggleCellState = function _toggleCellState (e) {
    if (e.target.className === 'selected') {
      e.target.className = ''
    } else {
      e.target.className ='selected'
    }
  }

  computeDataTable = function computeDataTable () {
    // parcours du tableau
    // création d'un objet mémoire recensant les cellules activées
    // on stocke à la fois par colonnes et par lignes
    const [,...rows] = this._container.querySelectorAll(`table tr`)
    const rowsData = []
    const columnsCellsData = []
    /**
    * Première étape,
    * on recense chaque cellule 
    * dans deux tableaux distincts,
    * * l'un pour les lignes,
    * * l'autre pour les colonnes
    */
    rows.forEach((currentRow, indexTableRow) => {
      const rowData = []
      const [,...cells] = currentRow.querySelectorAll('td')
      let previousNumberCellsEnabled = 0
      cells.forEach((currentCell, indexTableColumn) => {
        const isCurrentCellEnabled = this._isCellEnabled(currentCell)
        if (isCurrentCellEnabled) {
          previousNumberCellsEnabled++
        } else if (previousNumberCellsEnabled > 0) {
          rowData.push(previousNumberCellsEnabled)
          previousNumberCellsEnabled = 0
        }
        if (columnsCellsData.length === indexTableColumn) {
          columnsCellsData.push([])
        }
        columnsCellsData[indexTableColumn].push(isCurrentCellEnabled)
      })
      if (previousNumberCellsEnabled > 0) {
        rowData.push(previousNumberCellsEnabled)
      }
      rowsData.push(rowData)
    })

    /**
    * Deuxième étape,
    * on calcule les enchaînements des colonnes
    */
    const columnsData = columnsCellsData.map(currentColumnCellData => {
      const columnData = []
      let previousNumberCellsEnabled = 0
      currentColumnCellData.forEach(currentCell => {
        if (currentCell) {
          previousNumberCellsEnabled++
        } else if (previousNumberCellsEnabled > 0) {
          columnData.push(previousNumberCellsEnabled)
          previousNumberCellsEnabled = 0
        }
      })
      if (previousNumberCellsEnabled > 0) {
        columnData.push(previousNumberCellsEnabled)
      }
      return columnData
    })

    return {
      data: {
        rows: rowsData,
        columns: columnsData
      },
      size: {
        rows: rowsData.length,
        columns: columnsData.length
      }
    }
  }
}

export class PicrossGame extends PicrossEditor {
  constructor (container, picrossData) {
    super(container)
    this._picrossData = picrossData
  }
  
  createTable = function () {
    this._emptyNode(this._container)
    const table = document.createElement('table')
    for (let i = 0; i < this._picrossData.size.rows + 1; i++) {
      const currentRow = document.createElement('tr')
      for (let j = 0; j < this._picrossData.size.columns + 1; j++) {
        const currentCell = document.createElement('td')
        // si on est sur la première ligne
        if (i === 0) {
          // et pas sur la première colonne
          if (j > 0) {
            currentCell.innerHTML = this._picrossData.data.columns[j - 1].join(' ')
          }
        } else
        // sinon, si on est sur la première colonne (et donc sur les lignes suivantes)
        if (j === 0) {
          currentCell.innerHTML = this._picrossData.data.rows[i - 1].join('&nbsp;')
        }
        currentCell.onclick = this._toggleCellState.bind(this)
        currentRow.appendChild(currentCell)
      }
      table.appendChild(currentRow)
    }
    this._container.appendChild(table)
  }
  
  _toggleCellState = function (e) {
    if (e.target.className === 'selected') {
      e.target.className = ''
    } else {
      e.target.className ='selected'
    }
    this.isPicrossIsFinished() && this._onFinishedHandler()
  }
  
  isPicrossIsFinished = function () {
    const { 
      data: { 
        rows: currentRows, 
        columns: currentColumns
      }
    } = this.computeDataTable()

    const { 
      data: { 
        rows: picrossRows, 
        columns: picrossColumns
      }
    } = this._picrossData

    const currentRowsJoined = currentRows.map(cr => cr.join('-')).join('|')
    const currentColumnsJoined = currentColumns.map(cr => cr.join('-')).join('|')
    const picrossRowsJoined = picrossRows.map(cr => cr.join('-')).join('|')
    const picrossColumnsJoined = picrossColumns.map(cr => cr.join('-')).join('|')
    return currentRowsJoined === picrossRowsJoined && currentColumnsJoined === picrossColumnsJoined
  }
  
  onFinished = function (onFinishedHandler) {
    this._onFinishedHandler = onFinishedHandler
  }

}
