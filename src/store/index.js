import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    language: "en",
    serverMessage: "lol",
    user: {}
  },
  mutations: {
    switchLanguage(state, language) {
      state.language = language;
    },
    updateMessageServer(state, message) {
      state.serverMessage = message;
    }
  },
  actions: {
    switchLanguage(context, payload) {
      let language = payload === "en" ? "fr" : "en";
      context.commit("switchLanguage", language);
    },
    async updateMessageServer(context) {
      try {
        await axios
          .get("https://test-hypertube.herokuapp.com/test")
          .then(data => {
            context.commit("updateMessageServer", data);
          });
      } catch (error) {
        context.commit("updateMessageServer", error);
      }
    }
  },
  getters: {
    getLanguage: state => {
      return state.language;
    },
    getMessageServer: state => {
      return state.serverMessage;
    }
  }
});
