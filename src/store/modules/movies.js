import movieService from "../../services/MovieService.js";
const state = {
  movies: {},
  perPage: 20,
  page: 1
};

// getters
const getters = {};
// mutations
const mutations = {
  FETCH_MOVIES(state, movies) {
    state.movies = movies;
  }
};
// actions
const actions = {
  fetchMovies({ commit, dispatch, state }) {
    return movieService
      .getMovies(state.perPage, state.page)
      .then(response => {
        commit("FETCH_MOVIES", response.data.data.movies);
        const notification = {
          type: "success",
          message: "Movies fetched successfully"
        };
        dispatch("Notifications/add", notification, { root: true });
        return response.data.data.movies;
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "There was a problem fetching movies: " + error.message
        };
        dispatch("Notifications/add", notification, { root: true });
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
