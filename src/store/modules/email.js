import emailService from '../../services/EmailService'
import router from '../../router/index'

const state = {
  messageToUser: '',
  activationToken: '',
  emailToken: '',
  passwordToken: '',
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
  PUT_PASSWORD_TOKEN: (state, passwordToken) => {
    state.passwordToken = passwordToken
  },
  PUT_MESSAGE({ state }, message) {
    state.messageToUser = message
  },
}
// actions
const actions = {
  // Show a message on the user page
  setMessageToUser({ commit }, message) {
    commit('PUT_MESSAGE', message)
  },

  // New account activation with email validation
  setActivationToken({ commit }, activationToken) {
    // console.log('control_', activationToken)
    commit('PUT_ACTIVATION_TOKEN', activationToken)
  },
  getActivationToken({ getters }) {
    console.log('STORE token_ ', getters.activationToken)
    emailService.getactivationtoken(getters.activationToken)
  },

  // Change email with new email address validation
  setEmailToken({ commit }, emailToken) {
    commit('PUT_EMAIL_TOKEN', emailToken)
  },
  getEmailToken({ getters }) {
    console.log('STORE token_ ', getters.emailToken)
    emailService.getemailtoken(getters.emailToken)
  },

  // Reset password while disconnected with a link sent to the user mailbox
  sendResetPassLink({ commit }, emailResetPassword) {
    commit('PUT_PASSWORD_TOKEN', '')
    console.log('email_TEST_ ', emailResetPassword)
    emailService.postresetpassword(emailResetPassword)
  },
  // Change email with new email address validation
  setPasswordToken({ commit }, passwordToken) {
    commit('PUT_PASSWORD_TOKEN', passwordToken)
  },
  putDscResetPassword({ dispatch }, { dscNewPassword }) {
    console.log('STORE put Dsc Password Reset_ ', dscNewPassword)
    emailService
      .putdscresetpassword({ dscNewPassword })
      .then(response => {
        console.log('code 200?', response)
        if (response === 200) {
          console.log('OK_Reset Password', response)
          dispatch('setMessageToUser', response.data)
        }
      })
      .catch(error => {
        console.log('ERR_Activate New Password', error)
        if (error.response && error.response.status == 404) {
          router.push({
            name: '404',
            params: { resource: 'Reset password link validation' },
          })
        } else {
          router.push({
            name: 'network-issue',
          })
        }
      })
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
  passwordToken(state) {
    return state.passwordToken
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
