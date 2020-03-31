import Vue from "vue";
import Vuex from "vuex";
import App from "./modules/app.js";
import Movies from "./modules/movies.js";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { App, Movies }
});
