import UserService from '../../services/UserService'
import router from '../../router/index'

const state = {
  appName: 'Hypertube',
  Loading: false,
  langs: ['fr', 'en'],
  userInfo: {
    username: '',
    token: '',
    exp: '',
    auth: false,
  },
  links: [
    // {
    //   label: "user",
    //   linkname: "user",
    //   param: {}
    // },
    {
      label: 'movies',
      linkname: 'movies',
      params: { page: 1 },
    },
  ],
}

// getters
const getters = {
  isAuth: () => state.userInfo.auth,
}
// mutations
const mutations = {
  SET_TOKEN: (state, token) => {
    state.userInfo.token = token
  },
  SET_AUTH: (state, bool) => {
    state.userInfo.auth = bool
  },
}
// actions
const actions = {
  login: ({ commit, dispatch }, { username, password }) => {
    UserService.login(username, password)
      .then(response => {
        localStorage.setItem('token', JSON.stringify(response.data.token))
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
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
