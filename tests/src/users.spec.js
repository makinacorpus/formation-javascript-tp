import Users from './users'
import axios from 'axios'

jest.mock('axios')

describe('users', () => {
  it('sould return the user name', async () => {
    axios.get.mockResolvedValue({ data: [{ name: 'John Doe'}] });
    expect(await Users.getLastUserName()).toBe('John Doe')
  })

  it('sould return the user name', async () => {
    global.fetch = jest.fn().mockResolvedValue({ data: [{ name: 'John Doe'}] })
    expect(await Users.getLastUserNameFetch()).toBe('John Doe')
  })
})