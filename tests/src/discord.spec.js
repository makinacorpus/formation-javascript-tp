import { ping } from "./discord"

describe('discord', () => {
  it('should dm the user', async () => {
    const channel = {
      send: jest.fn()
    }
    const message = {
      delete: jest.fn().mockResolvedValue({}),
      reply: jest.fn(),
      author: {
        createDM: jest.fn().mockResolvedValue(channel)
      }
    }
    await ping(message)
    expect(message.delete).toHaveBeenCalled()
    expect(channel.send).toHaveBeenCalledWith('pong')
  })
})