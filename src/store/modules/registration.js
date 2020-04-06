import userService from "../../services/UserService.js";

const state = {};

// getters
const getters = {};
// mutations
const mutations = {};
// actions
const actions = {
  register(userInfo) {
    userService.register(userInfo).then(data => console.log(data));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
