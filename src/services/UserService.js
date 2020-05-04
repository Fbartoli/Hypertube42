import axios from 'axios'
// console.log('window_ ', window.__VUE_DEVTOOLS_GLOBAL_HOOK__.store.getters.App/storeToken);

const apiClient = axios.create({
  baseURL: 'https://hypertube42.herokuapp.com/users',
  withCredentials: false, // default value
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
  getuser(payloadGetUser) {
    // apiClient.defaults.headers.get['x-access-token'] = payloadGetUser.token.code;
    // apiClient.defaults.headers.post['x-access-token'] = payloadGetUser.token.code;
    apiClient.defaults.headers['x-access-token'] = payloadGetUser.token.code
    return apiClient.get('/user/' + payloadGetUser.payloadLogin.username)
  },
  putemail(payloadPutEmail) {
    console.log('putEmail_ ', payloadPutEmail)
    return apiClient.put(`/user/${payloadPutEmail.username}/email`, {
      email: payloadPutEmail.email,
    })
  },
  putuser(payloadPutUser) {
    console.log('putEmail_ ', payloadPutUser)
    return apiClient.put(
      `/user/${payloadPutUser.currentUsername}`,
      payloadPutUser
    )
  },
  login(login) {
    return apiClient.post('/login', login)
  },
  searchProfile(payloadSearchProfile) {
    return apiClient.get('/profile/' + payloadSearchProfile)
  },
}
