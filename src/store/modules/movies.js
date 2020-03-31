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
      .then(response =>
        context.commit("FETCH_MOVIES", response.data.data.movies)
      )
      .catch(error => console.log(error));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
