import UserService from '../../services/UserService'
import router from '../../router/index'

const state = {
  appName: 'Hypertube',
  Loading: false,
  langs: ['fr', 'en'],
  userInfo: {
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    token: '',
    exp: '',
    auth: false,
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
    console.log('app js_TEST_data', data)
    state.userInfo.username = data.username
    state.userInfo.email = data.email
    state.userInfo.firstname = data.firstname
    state.userInfo.lastname = data.lastname
  },
}

// actions
const actions = {
  login: ({ commit, dispatch }, { username, password }) => {
    UserService.login(username, password)
      .then(response => {
        localStorage.setItem('hypertube', JSON.stringify(response.data.token))
        commit('SET_TOKEN', response.data.token)
        commit('SET_AUTH', true)
        const notification = {
          type: response.data.status,
          message: 'Login successfull',
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
  getuser: ({ commit, dispatch }, { username }) => {
    UserService.getUser(username)
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
