import UserService from "../../services/UserService";

const state = {
  appName: "Hypertube",
  Loading: false,
  langs: ["fr", "en"],
  userInfo: {
    username: "",
    token: "",
    auth: false
  },
  links: [
    // {
    //   label: "user",
    //   linkname: "user",
    //   param: {}
    // },
    {
      label: "movies",
      linkname: "movies",
      params: { page: 1 }
    },
    {
      label: "sign in",
      linkname: "login",
      params: { page: 1 }
    }
  ]
};

// getters
const getters = {};
// mutations
const mutations = {
  SET_EMAIL: (state, email) => {
    state.userInfo.email = email;
  }
};
// actions
const actions = {
  setEmail: ({ commit }, email) => {
    commit("SET_EMAIL", email);
  },
  getUser: (context, username) => {
    UserService.getUser(username)
      .then(data => {
        return data;
      })
      .catch(error => {
        throw error;
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
