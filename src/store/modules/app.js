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
  RESET_LOCALSTORAGE_USERNAME: (state, username, exp) => {
    state.userInfo.username = username
    state.userInfo.exp = exp
  },
  PUT_EMAIL: (state, newEmail) => {
    console.log('TEST_app_js_PUT_EMAIL', newEmail)
    state.userInfo.email = newEmail
  },
  PUT_TOKEN: (state, newToken) => {
    console.log('TEST_app_js_PUT_TOKEN: ', newToken)
    state.userInfo.token = newToken.code
    state.userInfo.exp = newToken.exp
  },
  // Code review to do
  TOKEN: (state, token) => {
    state.userInfo.token = token
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
  login: ({ getters, dispatch, commit }, { username, password }) => {
    console.log('CHECK_IN_Login Bro', { username, password })
    userService
      .login({ username, password })
      .then(response => {
        const token = response.data.token
        localStorage.setItem('hypertube', JSON.stringify(token))
        commit('SET_TOKEN', token)
        commit('SET_AUTH', true)
        commit('PUT_USERNAME', username)
        // apiClient.defaults.headers.common['x-access-token'] = token
        dispatch('getUser', '')
        const notification = {
          type: response.data.status,
          message: 'Login successful',
        }
        dispatch('Notifications/add', notification, { root: true })
        if (getters.storePhoto) {
          console.log('Choose a profile pic at login ?', getters.storePhoto)
        }
        router.push({ name: 'movies' })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Wrong login or password, please try again',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({ name: '404', params: { resource: 'login' } })
          } else if (error.response.status === 403) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
          }
        } else {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        }
      })
  },

  // GET userInfo
  getUser: ({ getters, dispatch, commit }, username) => {
    if (username === '') {
      username = getters.storeUsername
    }
    console.log('payloadGetUser', username)
    userService
      .getuser({ username: username, token: getters.storeToken })
      .then(response => {
        commit('SET_USERINFO', response.data.user)
        const notification = {
          type: response.data.status,
          message: 'User info updated',
        }
        dispatch('Notifications/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem getting user info',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({
              name: '404',
              params: { resource: 'getting user info' },
            })
          } else if (error.response.status === 403) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
          }
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
        commit('PUT_TOKEN', response.data.token)
        dispatch('getUser', '')
        console.log('*** tracker ***')
        const notification = {
          type: response.data.status,
          message: 'Personal information updated !',
        }
        dispatch('Notifications/add', notification, { root: true })
        // router.push({ name: '/' })
        console.log('router ??', router)
        router.push({ name: 'home' })
      })
      .catch(error => {
        // console.log('updateUserInfo_error.response', error.response)
        const notification = {
          type: 'error',
          message: 'Issue occured while updating your personal information',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({
              name: '404',
              params: { resource: 'updating user info' },
            })
          } else if (error.response.status === 403) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
          }
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
        dispatch('getUser', '')
        router.push({ name: 'home' })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Issue occured while changing your email',
        }
        if (error.response) {
          console.log('OBSERVE_ ', error)
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({ name: '404', params: { resource: 'updating email' } })
          } else if (error.response.status === 403) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
          }
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
        dispatch('getUser', '')
        router.push({ name: 'home' })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Issue occured while changing your password',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({
              name: '404',
              params: { resource: 'modifying password' },
            })
          } else if (error.response.status === 403) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
          }
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
  storePhoto: state => {
    return state.userInfo.avatar
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
