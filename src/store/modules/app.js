import UserService from '../../services/UserService'
import router from '../../router/index'
import axios from 'axios'

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
    state.userInfo.token = token
    state.userInfo.username = JSON.parse(
      atob(token.code.split('.')[1])
    ).data.username
  },
  SET_AUTH: (state, bool) => {
    state.userInfo.auth = bool
  },
  SET_USERINFO: (state, data) => {
    console.log('TEST_app_js_SET_USERINFO', data)
    state.userInfo.username = data.username
    state.userInfo.email = data.email
    state.userInfo.firstname = data.firstName
    state.userInfo.lastname = data.lastName
    state.userInfo.language = data.language
    state.userInfo.avatar = data.avatar
  },
  PUT_USERINFO: (state, newUserInfo) => {
    console.log('TEST_app_js_PUT_USERINFO', newUserInfo)
    state.userInfo.username = newUserInfo.username
    state.userInfo.firstname = newUserInfo.firstname
    state.userInfo.lastname = newUserInfo.lastname
    state.userInfo.language = newUserInfo.language
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
}

// actions
const actions = {
  setUserInfo: ({ commit }, { data }) => {
    commit('SET_USERINFO', data)
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
  login: ({ commit, dispatch }, { username, password }) => {
    UserService.login(username, password)
      .then(response => {
        localStorage.setItem('hypertube', JSON.stringify(response.data.token))
        commit('SET_TOKEN', response.data.token)
        commit('SET_AUTH', true)
        const notification = {
          type: response.data.status,
          message: 'Login successful',
        }
        dispatch('Notifications/add', notification, { root: true })
        router.push({ name: 'movies' })
        console.log('VERIF_username', username)
        dispatch('getUser', { username })
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
  // DEPRECATED_getUser: ({ commit, dispatch }, { username }) => {
  //   UserService.getuser(username)
  //     .then(response => {
  //       commit('SET_USERINFO', response.data)
  //       const notification = {
  //         type: response.data.status,
  //         message: 'Get user successful',
  //       }
  //       dispatch('Notifications/add', notification, { root: true })
  //       // router.push({ name: '/' })
  //     })
  //     .catch(error => {
  //       const notification = {
  //         type: 'error',
  //         message: 'There was a problem getting user info',
  //       }
  //       if (error.response && error.response.status == 404) {
  //         dispatch('Notifications/add', notification, {
  //           root: true,
  //         })
  //       } else if (error.response && error.response.status == 403) {
  //         dispatch('Notifications/add', notification, {
  //           root: true,
  //         })
  //       } else {
  //         dispatch('Notifications/add', notification, {
  //           root: true,
  //         })
  //       }
  //     })
  // },
  getUser: ({ state, dispatch, commit }, { username }) => {
    axios
      .get(`https://hypertube42.herokuapp.com/users/user/${username}`, {
        headers: {
          // 'Access-Control-Allow-Origin': true,
          'x-access-token': state.userInfo.token,
        },
      })
      .then(function(response) {
        console.log('TEST_getUser: ', response)
        commit('SET_USERINFO', response.data.user)
        const notification = {
          type: response.data.status,
          message: 'Get user successful',
        }
        dispatch('Notifications/add', notification, { root: true })
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
  getOtherUser: ({ commit, dispatch }, { username }) => {
    UserService.getOtherUser(username)
      .then(response => {
        commit('SET_USERINFO', response.data)
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
}

// getters
const getters = {
  isAuth: () => state.userInfo.auth,
  storeUser: state => {
    const resUser = {}
    return Object.assign(resUser, state.userInfo)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
