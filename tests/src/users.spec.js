import axios from 'axios'
import users from './users'

jest.mock('axios')

describe('users', () => {
  beforeEach(() => {
    axios.mockClear()
  })
  it('sould return the user name', async () => {
    axios.get.mockResolvedValue({ data: [{ name: 'John Doe'}] })
    expect(await users.getLastUserName()).toBe('John Doe')
  })
})