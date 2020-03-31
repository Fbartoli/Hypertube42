import movieService from "../../services/MovieService.js";
const state = {
  movies: {}
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
  fetchMovies(context) {
    movieService
      .getMovies()
      .then(response => {
        context.commit("FETCH_MOVIES", response.data.data.movies);
        const notification = {
          type: "success",
          message: "Movies fetched successfully"
        };
        context.dispatch("Notifications/add", notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "There was a problem fetching movies: " + error.message
        };
        context.dispatch("Notifications/add", notification, { root: true });
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
