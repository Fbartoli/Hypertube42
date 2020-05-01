import axios from 'axios'
// import { mapGetters } from 'vuex'

const apiClient = axios.create({
  baseURL: 'https://hypertube42.herokuapp.com/users',
  withCredentials: false, //default value
  // 'x-access-token': `${token}`,
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
  getuser(username) {
    return apiClient.get(`/user/${username}`)
  },
  // postuser(username) {
  //   return apiClient.post(`/user/${username}`)
  // },
  // putuser(username) {
  //   return apiClient.put(`/user/${username}`)
  // },
  login(username, password) {
    return apiClient.post('/login', { username, password })
  },
}
