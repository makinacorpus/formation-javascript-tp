import { PicrossEditor } from './Picross'


describe('PicrossEditor', () => {
  it('should create an empty table', () => {
    const table = document.createElement('table')
    const emptyTable = {"data": {"columns": [], "rows": []}, "size": {"columns": 0, "rows": 0}}
    const picross = new PicrossEditor(table)
    picross.createTable()
    expect(picross.computeDataTable()).toEqual(emptyTable)
  })

  it('should create a 2 x 2 table', () => {
    const container = document.createElement('div')
    const emptyTable = {"data": {"columns": [[], []], "rows": [[], []]}, "size": {"columns": 2, "rows": 2}}
    const picross = new PicrossEditor(container)
    picross.createTable(2, 2)
    expect(picross.computeDataTable()).toEqual(emptyTable)
  })
})