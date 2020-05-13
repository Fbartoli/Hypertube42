import emailService from '../../services/EmailService'
import router from '../../router/index'

const state = {
  messageToUser: '',
  checker: '',
  activationToken: '',
  emailToken: '',
  passwordToken: '',
}

// mutations
const mutations = {
  PUT_MESSAGE(state, message) {
    console.log('STORE_email.js_PUT_MESSAGE')
    state.messageToUser = message
  },
  PUT_CHECKER(state, check) {
    state.checker = check
  },
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
}
// actions
const actions = {
  // Show a message on the user page
  setMessageToUser({ commit }, message) {
    console.log('STORE_email.js_setMessageToUser', typeof message)
    commit('PUT_MESSAGE', message)
  },
  setChecker({ commit }, check) {
    commit('PUT_CHECKER', check)
  },
  resetChecker({ commit }) {
    commit('PUT_CHECKER', '')
  },

  // GET and save the account activation token
  setActivationToken({ commit }, activationToken) {
    commit('PUT_ACTIVATION_TOKEN', activationToken)
  },
  // New account activation with email validation
  getActivationToken({ getters, dispatch }) {
    emailService
      .getactivationtoken(getters.activationToken)
      .then(response => {
        console.log('RESPONSE_Signup_email.js line 56_ ', response)
        console.log('should be 200: ', response.status)
        if (response.status === 200) {
          dispatch('setChecker', 'OK')
          console.log('OK_Activate New Account', response)
          // dispatch('setMessageToUser', 'Your account was successfully activated !')
          console.log('TESTEST', response.data)
          const notification = {
            type: 200,
            message: 'Your account was successfully activated !',
          }
          dispatch('Notifications/add', notification, { root: true })
        } else {
          router.push({
            name: 'home',
          })
        }
      })
      .catch(error => {
        if (error.response) {
          console.log('ERR_Signup_error.response', error.response)
          console.log(
            'ERR_Signup_error.response.data.error',
            error.response.data.error
          )
          // dispatch('setMessageToUser', error.response.data.error)
          console.log('TESTEST_err', error.response)
          const notification = {
            type: error.response.status,
            message: error.response.data.error,
          }
          dispatch('Notifications/add', notification, { root: true })
          if (error.response.status === 403) {
            return
          }
          dispatch('Notifications/add', notification, { root: true })
          if (error.response.status === 404) {
            router.push({
              name: '404',
              params: { resource: 'Account link validation' },
            })
          }
          if (error.response.status === 500) {
            router.push({
              name: 'network-issue',
            })
          }
        }
        router.push({
          name: 'home',
        })
      })
  },
  // Replace account activation link with a new email
  // (replace the first token from registration)
  getActivationTokenAgain({ commit, dispatch }, activationEmail) {
    commit('PUT_ACTIVATION_TOKEN', '')
    emailService
      .putactivationtoken(activationEmail)
      .then(response => {
        console.log('RESPONSE_getActivationTokenAgain_ ', response)
        console.log('should be 200: ', response.status)
        if (response.status === 200) {
          console.log('OK_getActivationTokenAgain', response)
          const notification = {
            type: 200,
            message: 'Email received with a new activation link !',
          }
          dispatch('Notifications/add', notification, { root: true })
        } else {
          router.push({
            name: 'home',
          })
        }
      })
      .catch(error => {
        if (error.response) {
          console.log('ERR_getActivationTokenAgain', error.response)
          console.log(
            'ERR_ActTokenAgain_error.response.data.error',
            error.response.data.error
          )
          console.log('TESTEST3', error.response)
          const notification = {
            type: error.response.status,
            message: error.response.data.error,
          }
          dispatch('Notifications/add', notification, { root: true })
          if (error.response.status === 404) {
            router.push({
              name: '404',
              params: { resource: 'Send again an activation link' },
            })
          }
          if (error.response.status === 500) {
            router.push({
              name: 'network-issue',
            })
          }
        }
        router.push({
          name: 'home',
        })
      })
  },

  // Change email with new email address validation
  setEmailToken({ commit }, emailToken) {
    commit('PUT_EMAIL_TOKEN', emailToken)
  },
  getEmailToken({ getters, dispatch }) {
    console.log('STORE token_ ', getters.emailToken)
    emailService
      .getemailtoken(getters.emailToken)
      .then(response => {
        console.log('RESPONSE_Resetemail_email.js line 114_ ', response)
        console.log('should be 200: ', response.status)
        if (response.status === 200) {
          dispatch('setChecker', 'OK')
          console.log('OK_Reset Email', response)
          const notification = {
            type: 200,
            message: 'Your email was successfully updated !',
          }
          dispatch('Notifications/add', notification, { root: true })
        } else {
          router.push({
            name: 'home',
          })
        }
      })
      .catch(error => {
        if (error.response) {
          console.log('ERR_Resetemail_error.response', error.response)
          console.log(
            'ERR_Resetemail_error.response.data.error',
            error.response.data.error
          )
          const notification = {
            type: error.response.status,
            message: error.response.data.error,
          }
          dispatch('Notifications/add', notification, { root: true })
          if (error.response.status === 404) {
            router.push({
              name: '404',
              params: { resource: 'Account link validation' },
            })
          }
          if (error.response.status === 500) {
            router.push({
              name: 'network-issue',
            })
          }
        }
        router.push({
          name: 'home',
        })
      })
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
  // Valid password change in offline mode
  // (through a link sent by email leading to page/ResetPasswordDscValid.vue)
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
        if (error.response) {
          if (error.response.status === 404) {
            router.push({
              name: '404',
              params: { resource: 'Reset password link validation' },
            })
          }
        } else {
          router.push({
            name: 'home',
          })
        }
      })
  },
}

// getters
const getters = {
  storeMessageToUser(state) {
    return state.messageToUser
  },
  storeChecker(state) {
    return state.checker
  },
  activationToken(state) {
    return state.activationToken
    // const copyStr = Object.assign("", state.activationToken)
    // console.log('activationToken_ ', copyStr)
    // return copyStr
  },
  emailToken(state) {
    return state.emailToken
  },
  passwordToken(state) {
    return state.passwordToken
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
