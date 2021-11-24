import { Timer } from './Timer'

jest.setTimeout(30000);

describe('Timer', () => {
  let timerContainer
  let timer
  beforeEach(() => {
    timerContainer = document.createElement('div')
    timer = new Timer(timerContainer)
  })
  it('should create an empty table', () => {
    timer.startTimer()
    return new Promise((r) => setTimeout(r, 10000))
      .then(() => {
        expect(timer.currentTime).toBeGreaterThanOrEqual(9)
      })
  })
})