import movieService from '../../services/MovieService.js'
const state = {
  movies: [],
  movie: {},
  perPage: 20,
  page: 1,
  movieTotal: 0,
}

// getters
const getters = {}
// mutations
const mutations = {
  FETCH_MOVIES(state, movies) {
    state.movies = movies
  },
  FETCH_MOVIE(state, movie) {
    state.movie = movie
  },
  SET_MOVIES_TOTAL(state, moviesTotal) {
    state.movieTotal = moviesTotal
  },
}
// actions
const actions = {
  fetchMovies({ commit, dispatch, state }, page) {
    return movieService
      .getMovies(state.perPage, page)
      .then(response => {
        commit('FETCH_MOVIES', response.data.data.movies)
        commit('SET_MOVIES_TOTAL', parseInt(response.data.data.movie_count))
        const notification = {
          type: 'success',
          message: 'Movies fetched successfully',
        }
        dispatch('Notifications/add', notification, { root: true })
        return response.data.data.movies
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching movies: ' + error.message,
        }
        dispatch('Notifications/add', notification, { root: true })
      })
  },
  fetchMovie({ commit }, id) {
    return movieService.getMovie(id).then(response => {
      commit('FETCH_MOVIE', response.data.data.movie)
      return response.data.data.movie
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
