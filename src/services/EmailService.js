import axios from 'axios'
// console.log('window_ ', window.__VUE_DEVTOOLS_GLOBAL_HOOK__.store.getters.App/storeToken);

const apiClientEmail = axios.create({
  baseURL: 'https://hypertube42.herokuapp.com/users',
  withCredentials: false, // default value
  timeout: 5000,
})

export default {
  // Validate a new account
  getactivationtoken(activationToken) {
    console.log('TEST_getactivationtoken ', activationToken)
    return apiClientEmail.get('/activation/' + activationToken)
  },

  // Validate an email change
  getemailtoken(emailToken) {
    return apiClientEmail.get('/email/' + emailToken)
  },

  // reset password while disconnected with an email link
  // A) The user types his email and receives an a clickable link
  postresetpassword(emailResetPassword) {
    return apiClientEmail.post('/password/reset/', {
      email: emailResetPassword,
    })
  },
  // B) The user valids his new password thanks to the passwordToken
  putdscresetpassword({ dscNewPassword }) {
    return apiClientEmail.put('/password/reset/', { dscNewPassword }) // contains 2 fields { token, new_password })
  },
}
