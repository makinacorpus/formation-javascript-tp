import { sleep } from "./timer"

describe('timer', () => {
  it.concurrent('should wait 2s', async () => {
    const t = Date.now()
    await sleep(2)
    expect(Date.now() - t).toBeGreaterThanOrEqual(2000)
  })

  it.concurrent('should wait 3s', async () => {
    const t = Date.now()
    await sleep(3)
    expect(Date.now() - t).toBeGreaterThanOrEqual(3000)
  })
})