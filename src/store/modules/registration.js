import registrationService from "../../services/RegistrationService.js";

const state = {};

// getters
const getters = {};
// mutations
const mutations = {};
// actions
const actions = {
  register(userInfo) {
    registrationService
      .register(userInfo)
      .then(data => console.log(`user data is ${data}`));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
