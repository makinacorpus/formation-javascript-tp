import axios from "axios"

export default {
  async getLastUserName() {
    const users = await axios.get('https://jsonplaceholder.typicode.com/users')
    return users.data[0].name
  },

  async getLastUserNameFetch() {
    const users = await fetch('https://jsonplaceholder.typicode.com/users')
    return users.data[0].name
  }
}