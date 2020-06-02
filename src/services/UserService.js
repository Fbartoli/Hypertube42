import axios from 'axios'

const apiClient = axios.create({
  // baseURL: `${process.env.VUE_APP_BACKEND_URL}`,
  baseURL: `${process.env.VUE_APP_BACKEND_URL}`,
  // baseURL: 'https://hypertube42.herokuapp.com/',
  // baseURL: 'http://localhost:3000',
  withCredentials: false, // default value
  timeout: 8000,
})

console.log('_ _ _ & & & backend & & & _ _ _', process.env.VUE_APP_BACKEND_URL)
console.log('_ _ _ & & & front & & & _ _ _', process.env.VUE_APP_BASE_URL)
console.log(
  '_ _ _ & & & front2 & & & _ _ _',
  `${process.env.VUE_APP_BACKEND_URL}`
)

export default {
  // querries when the user is connected on its account
  // (or connecting, for 'login')

  // Sign in
  login(login) {
    return apiClient.post('users/login', login)
  },

  // GET userInfo
  getuser({ username, token }) {
    apiClient.defaults.headers['x-access-token'] = token
    return apiClient.get('users/user/' + username)
  },

  // PUT user email address
  putemail(payloadPutEmail) {
    console.log('putEmail_ ', payloadPutEmail)
    return apiClient.put(`users/user/${payloadPutEmail.username}/email`, {
      email: payloadPutEmail.email,
    })
  },

  // PUT userInfo
  putuser({ payloadPutUser }) {
    console.log('UserService.js_putuser_ ', payloadPutUser)
    return apiClient.put(
      `users/user/${payloadPutUser.currentUsername}`,
      payloadPutUser
    )
  },

  // GET another profile - TO REVIEW & TEST
  searchProfile(payloadSearchProfile) {
    // console.log('UserService.js_payloadSearchProfile_ ', payloadSearchProfile)
    return apiClient.get('users/user/' + payloadSearchProfile)
  },

  // PUT user password
  putonlinepass({ onlineNewPassword }) {
    console.log('TEST_putonlinepass ', onlineNewPassword)
    return apiClient.put(`users/user/${onlineNewPassword.username}/password`, {
      password: onlineNewPassword.password,
      new_password: onlineNewPassword.new_password,
    }) // { password, new_password })
  },

  // POST comment on a specific movie
  postcomment({ ref, text }) {
    // console.log('UserService.js_POSTcomment ', ref)
    return apiClient.post(`films/comment/${ref}`, { text: text })
  },
  // GET all comments on a specific movie
  getcomment(ref) {
    console.log('UserService.js_GETcomment ', ref)
    return apiClient.get(`films/comment/${ref}`)
  },

  // POST user view on a specific movie
  postview(filmRef) {
    console.log('UserService.js_POSTview ', filmRef)
    return apiClient.post(`films/view`, { filmRef: filmRef })
  },
  // GET views on all movies
  getview() {
    console.log('UserService.js_GETview_OK')
    return apiClient.get(`films/view`)
  },

  // GET subtitles on a specific movie
  getsubs({ imdbid, language }) {
    console.log('UserService.js_GETview_OK')
    return apiClient.get(`films/subs/${imdbid}?language=${language}`)
  },
}
