import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://hypertube42.herokuapp.com/users',
  withCredentials: false, //default value
  timeout: 5000,
})
export default {
  register({ username, email, firstName, lastName, password }) {
    return apiClient.post('/user', {
      username,
      email,
      firstName,
      lastName,
      password,
    })
  },
  getUser(username) {
    return apiClient.put(`/user/${username}`)
  },
  login(username, password) {
    return apiClient.post('/login', { username, password })
  },
}
