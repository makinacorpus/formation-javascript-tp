export class Timer {
  constructor(container) {
    this._intervalId = null
    this._currentTime = null
    this._container = container
  }
  _resetTime () {
    this._currentTime = 0
    this._updateDisplay()
  }
  _updateDisplay () {
    this._container.innerHTML = this._currentTime + ' s'
  }
  startTimer () {
    this._resetTime()
    this._intervalId = setInterval(() => {
      this._currentTime++
      this._updateDisplay()
    }, 1000)
  }
  stopTimer () {
    if (this._intervalId) clearInterval(this._intervalId)
  }
}