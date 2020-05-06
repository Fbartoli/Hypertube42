import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://hypertube42.herokuapp.com/users',
  withCredentials: false, // default value
  timeout: 8000,
})

export default {
  // querries when the user is connected on its account
  // (or connecting, for 'login')

  // Sign in
  login(login) {
    return apiClient.post('/login', login)
  },

  // GET userInfo
  getuser(payloadGetUser) {
    apiClient.defaults.headers['x-access-token'] = payloadGetUser.token.code
    return apiClient.get('/user/' + payloadGetUser.payloadLogin.username)
  },

  // PUT user email address
  putemail(payloadPutEmail) {
    console.log('putEmail_ ', payloadPutEmail)
    return apiClient.put(`/user/${payloadPutEmail.username}/email`, {
      email: payloadPutEmail.email,
    })
  },

  // PUT userInfo
  putuser(payloadPutUser) {
    console.log('putEmail_ ', payloadPutUser)
    return apiClient.put(
      `/user/${payloadPutUser.currentUsername}`,
      payloadPutUser
    )
  },

  // GET another profile - TO REVIEW & TEST
  searchProfile(payloadSearchProfile) {
    return apiClient.get('/profile/' + payloadSearchProfile)
  },

  // PUT user password
  putonlinepass({ onlineNewPassword }) {
    console.log('TEST_putonlinepass ', onlineNewPassword)
    return apiClient.put(`/user/${onlineNewPassword.username}/password`, {
      password: onlineNewPassword.password,
      new_password: onlineNewPassword.new_password,
    }) // { password, new_password })
  },
}
