import userService from '../../services/UserService'
import router from '../../router/index'
// import axios from 'axios'

const getDefaultState = () => {
  return {
    appName: 'Hypertube',
    Loading: false,
    langs: ['fr', 'en'],
    userInfo: {
      token: '',
      exp: '',
      auth: false,
      username: '',
      email: '',
      firstame: '',
      lastname: '',
      language: 'english',
      avatar: '',
    },
  }
}

const state = {
  appName: 'Hypertube',
  Loading: false,
  langs: ['fr', 'en'],
  userInfo: {
    token: '',
    exp: '',
    auth: false,
    username: '',
    email: '',
    firstame: '',
    lastname: '',
    language: 'english',
    avatar: '',
  },
}

// mutations
const mutations = {
  SET_TOKEN: (state, token) => {
    state.userInfo.token = token.code
    state.userInfo.exp = token.exp
    state.userInfo.username = JSON.parse(
      atob(token.code.split('.')[1])
    ).data.username
  },
  SET_AUTH: (state, bool) => {
    state.userInfo.auth = bool
  },
  SET_USERINFO: (state, data) => {
    // console.log('TEST_app_js_SET_USERINFO', data)
    state.userInfo.username = data.username
    state.userInfo.email = data.email
    state.userInfo.firstname = data.firstName
    state.userInfo.lastname = data.lastName
    state.userInfo.language = data.language
    state.userInfo.avatar = data.photo
  },
  PUT_USERINFO: (state, newUserInfo) => {
    console.log('TEST_app_js_PUT_USERINFO', newUserInfo)
    state.userInfo.username = newUserInfo.username
    state.userInfo.firstname = newUserInfo.firstname
    state.userInfo.lastname = newUserInfo.lastname
    state.userInfo.language = newUserInfo.language
  },
  PUT_USERNAME: (state, username) => {
    console.log('TEST_app_js_PUT_USERNAME', username)
    state.userInfo.username = username
  },
  PUT_EMAIL: (state, newEmail) => {
    console.log('TEST_app_js_PUT_EMAIL', newEmail)
    state.userInfo.email = newEmail
  },
  PUT_TOKEN: (state, newToken) => {
    console.log('TEST_app_js_PUT_TOKEN: ', newToken)
    state.userInfo.token = newToken.token.code
    state.userInfo.exp = newToken.token.exp
  },
  // Code review to do
  TOKEN: (state, token) => {
    state.userInfo.token = token
  },
  TEST: (state, { username }, exp) => {
    state.userInfo.username = username
    state.userInfo.exp = exp
  },
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  },
  //
}

// actions
const actions = {
  setUserInfo: ({ commit }, { data }) => {
    commit('SET_USERINFO', data)
  },
  resetState: ({ commit }) => {
    localStorage.removeItem('hypertube')
    commit('RESET_STATE')
  },
  putUserInfo: ({ commit }, { newUserInfo }) => {
    commit('PUT_USERINFO', newUserInfo)
  },
  putEmail: ({ commit }, newEmail) => {
    commit('PUT_EMAIL', newEmail)
  },
  putToken: ({ commit }, newToken) => {
    commit('PUT_TOKEN', newToken)
  },
  token: ({ commit }, token) => {
    commit('TOKEN', token)
  },

  // Called by the user in ../pages/Login.vue to sign in
  login: ({ commit, dispatch }, payloadLogin) => {
    console.log('SUMMER_ ', payloadLogin)
    userService
      .login(payloadLogin)
      .then(response => {
        const token = response.data.token
        localStorage.setItem('hypertube', JSON.stringify(token))
        commit('SET_TOKEN', token)
        commit('SET_AUTH', true)
        // apiClient.defaults.headers.common['x-access-token'] = token
        dispatch('getUser', { token, payloadLogin })
        const notification = {
          type: response.data.status,
          message: 'Login successful',
        }
        dispatch('Notifications/add', notification, { root: true })
        router.push({ name: 'movies' })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem login',
        }
        if (error.response && error.response.status == 404) {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        } else if (error.response && error.response.status == 403) {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        } else {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        }
      })
  },

  // GET userInfo
  getUserAuth: ({ getters, commit, dispatch }) => {
    const token = getters.storeToken
    const username = getters.storeUsername
    userService
      .getuserauth({ token: token, username: username })
      .then(response => {
        commit('SET_USERINFO', response.data.user)
        const notification = {
          type: response.data.status,
          message: 'Get user successful',
        }
        dispatch('Notifications/add', notification, { root: true })
        // router.push({ name: '/' })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem getting user info',
        }
        if (error.response && error.response.status == 404) {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        } else if (error.response && error.response.status == 403) {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        } else {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        }
      })
  },

  // GET userInfo
  getUser: ({ commit, dispatch }, payloadGetUser) => {
    console.log('payloadGetUser', payloadGetUser)
    userService
      .getuser(payloadGetUser)
      .then(response => {
        commit('SET_USERINFO', response.data.user)
        const notification = {
          type: response.data.status,
          message: 'Get user successful',
        }
        dispatch('Notifications/add', notification, { root: true })
        // router.push({ name: '/' })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem getting user info',
        }
        if (error.response && error.response.status == 404) {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        } else if (error.response && error.response.status == 403) {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        } else {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        }
      })
  },

  // Called by the user in ../pages/User.vue to modify user data
  updateUserInfo: ({ commit, dispatch }, { payloadPutUser }) => {
    console.log('payloadPutUser', payloadPutUser)
    userService
      .putuser({ payloadPutUser })
      .then(response => {
        console.log('TEST_validatePersonalInfo_User.vue', response)
        commit('SET_USERINFO', response.data.user)
        commit('PUT_TOKEN', response.data.token)
        const notification = {
          type: response.data.status,
          message: 'Personal information updated !',
        }
        dispatch('Notifications/add', notification, { root: true })
        // router.push({ name: '/' })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Issue occured while updating your personal information',
        }
        if (error.response && error.response.status == 404) {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        } else if (error.response && error.response.status == 403) {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        } else {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        }
      })
  },

  // Called by the user in ../pages/User.vue to modify email address
  // Send a link to the new email address for the user to confirm change
  updateEmail: ({ dispatch }, { payloadPutEmail }) => {
    userService
      .putemail(payloadPutEmail)
      .then(response => {
        console.log('RESPONSE changeEmail app.js', response)
        // dispatch('Email/setChecker', 'OK', { root: true })
        const notification = {
          type: response.data.status,
          message: 'Please, valid the message sent to your new email address',
        }
        dispatch('Notifications/add', notification, { root: true })
        // router.push({ name: 'home' })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Issue occured while changing your email',
        }
        if (error.response.status === 404) {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        } else if (error.response.status === 403) {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        } else {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        }
        router.push({ name: 'home' })
      })
  },

  // Called by the user in ../pages/ResetPasswordOnline.vue
  // in order to change the password while connected
  putOnlineNewPassword: ({ dispatch }, { onlineNewPassword }) => {
    userService
      .putonlinepass({ onlineNewPassword })
      .then(response => {
        console.log('RESPONSE onlineNewPassword app.js', response)
        const notification = {
          type: response.data.status,
          message: 'Your new password is set !',
        }
        dispatch('Notifications/add', notification, { root: true })
        // router.push({ name: '/' })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Issue occured while changing your password',
        }
        if (error.response && error.response.status == 404) {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        } else if (error.response && error.response.status == 403) {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        } else {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        }
      })
  },
}

// getters
const getters = {
  token(state) {
    return state.userInfo.token
  },
  isAuth: () => state.userInfo.auth,
  storeToken: state => {
    return state.userInfo.token
  },
  storeUser: state => {
    const resUser = {}
    return Object.assign(resUser, state.userInfo)
  },
  // storeUsername: state => state.userInfo.username
  storeAppName: state => {
    return state.appName
  },
  storeLangs: state => {
    return state.langs
  },
  storeUsername: state => {
    return state.userInfo.username
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
