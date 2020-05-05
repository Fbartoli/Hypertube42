import userService from '../../services/UserService'
// import router from '../../router/index'

const state = {
  activationToken: '',
  emailToken: '',
  passToken: '',
  messageToUser: '',
}

// mutations
const mutations = {
  PUT_ACTIVATION_TOKEN: (state, accountToken) => {
    state.activationToken = accountToken
  },
  // PUT_ACTIVATION_TOKEN({ state }, activationToken) {
  //   state.activationToken = activationToken
  // },
  PUT_EMAIL_TOKEN: (state, emailToken) => {
    state.emailToken = emailToken
  },
  // PUT_EMAIL_TOKEN({ state }, emailToken) {
  //   state.emailToken = emailToken
  // },
  PUT_PASS_TOKEN: (state, passToken) => {
    state.passToken = passToken
  },
  PUT_MESSAGE({ state }, message) {
    state.messageToUser = message
  },
}
// actions
const actions = {
  setActivationToken({ commit }, activationToken) {
    // console.log('control_', activationToken)
    commit('PUT_ACTIVATION_TOKEN', activationToken)
  },
  setEmailToken({ commit }, emailToken) {
    commit('PUT_EMAIL_TOKEN', emailToken)
  },
  setMessageToUser({ commit }, message) {
    commit('PUT_MESSAGE', message)
  },
  getActivationToken({ getters }) {
    console.log('STORE token_ ', getters.activationToken)
    userService.getactivationtoken(getters.activationToken)
  },
  getEmailToken({ getters }) {
    console.log('STORE token_ ', getters.emailToken)
    userService.getemailtoken(getters.emailToken)
  },
}

// getters
const getters = {
  activationToken(state) {
    return state.activationToken
    // const copyStr = Object.assign("", state.activationToken)
    // console.log('activationToken_ ', copyStr)
    // return copyStr
  },
  emailToken(state) {
    return state.emailToken
    // const copyStr = Object.assign("", state.emailToken)
    // console.log('emailToken_ ', copyStr)
    // return copyStr
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
