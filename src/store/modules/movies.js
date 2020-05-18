import movieService from '../../services/MovieService.js'
import userService from '../../services/UserService'
import router from '../../router/index'
import nProgress from 'nprogress'

const state = {
  movies: [],
  movie: {},
  perPage: 20,
  page: 1,
  movieTotal: 0,
  comments: {},
}

// mutations
const mutations = {
  FETCH_MOVIES(state, movies) {
    state.movies = movies
  },
  ADD_MOVIES(state, movies) {
    state.movies = state.movies.concat(movies)
  },
  FETCH_MOVIE(state, movie) {
    state.movie = movie
  },
  SET_MOVIES_TOTAL(state, moviesTotal) {
    state.movieTotal = moviesTotal
  },
  PUT_COMMENTS(state, com) {
    console.log('COM', com)
    state.comments = com
  },
}
// actions
const actions = {
  // A) Movies API:
  // A.1.a) GET movies from YTS with standard search paramaters
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
        if (error.message) {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching movies: ' + error.message,
          }
          dispatch('Notifications/add', notification, { root: true })
        }
      })
  },
  // A.1.b) Follow up action of 'fetchMovies' (1.a) to GET the next page of movies
  addMovies({ commit, state }, page) {
    console.log('/// addMovies ///')
    nProgress.start()
    return movieService.getMovies(state.perPage, page).then(response => {
      commit('ADD_MOVIES', response.data.data.movies)
      nProgress.done()
      return response.data.data.movies
    })
  },
  // A.1.c) GET the specific movie details from the api YTS
  fetchMovie({ commit }, id) {
    console.log('/// fetchMovies ///')
    return movieService.getMovie(id).then(response => {
      commit('FETCH_MOVIE', response.data.data.movie)
      return response.data.data.movie
    })
  },

  // A.2.a) get movies from YTS with standard search paramaters
  filteredFetchMovies({ commit, dispatch, state }, { page, filter, order }) {
    console.log('/// filteredFetchMovies ///')
    return movieService
      .getMoviesFilterBy({ perPage: state.perPage, page, filter, order })
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
        if (error.message) {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching movies: ' + error.message,
          }
          dispatch('Notifications/add', notification, { root: true })
        }
      })
  },
  // A.2.b) Follow up action of 'filteredFetchMovies' (2.a) to GET the next page of movies
  // It is the equivalent to 'addMovies' (1.b) but filtered
  filteredAddMovies({ commit, state }, { page, filter, order }) {
    console.log('/// filteredAddMovies ///')
    nProgress.start()
    return movieService
      .getMoviesFilterBy({ perPage: state.perPage, page, filter, order })
      .then(response => {
        commit('ADD_MOVIES', response.data.data.movies)
        nProgress.done()
        return response.data.data.movies
      })
  },

  // B) Comments:
  // B.1) POST movie comment
  sendComment: ({ dispatch }, { ref, text }) => {
    // console.log('POST comments_app.js_REF_', ref)
    // console.log('app.js_TEXT_', text)
    userService
      .postcomment({ ref, text })
      .then(response => {
        const notification = {
          type: response.data.status,
          message: 'Your comment was successfully sent !',
        }
        dispatch('Notifications/add', notification, { root: true })
        router.push({
          name: 'movie',
          params: { id: ref || '' },
        })
      })
      .catch(error => {
        console.log('STORE movies.js_sendComment_error_', error)
        const notification = {
          type: 'error',
          message: 'There was an issue while sending your comment',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({
              name: '404',
              params: { resource: 'sending comment' },
            })
          } else if (error.response.status === 403) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
          }
        } else {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        }
      })
  },
  // B.2) GET movie comments
  getComments: ({ dispatch, commit }, ref) => {
    console.log('GET comments_app.js_REF', ref)
    userService
      .getcomment(ref)
      .then(response => {
        console.log('RESPONSE', response.data.comments)
        commit('PUT_COMMENTS', response.data.comments)
        const notification = {
          type: response.data.status,
          message: 'TEST ONLY_Comments loaded',
        }
        dispatch('Notifications/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was an issue while loading comments',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({
              name: '404',
              params: { resource: 'getting comments' },
            })
          } else if (error.response.status === 403) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
          }
        } else {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        }
      })
  },

  // C) Views:
  // C.1) POST movie comment
  sendView: ({ dispatch }, filmRef) => {
    console.log('POST view_app.js_REF_', filmRef)
    userService
      .postview(filmRef)
      .then(response => {
        const notification = {
          type: response.data.status,
          message: 'Movie viewed !',
        }
        dispatch('Notifications/add', notification, { root: true })
      })
      .catch(error => {
        console.log('STORE movies.js_sendView_error_', error)
        const notification = {
          type: 'error',
          message: 'Error from Movie view',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({ name: '404', params: { resource: 'new movie view' } })
          } else if (error.response.status === 403) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
          }
        } else {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        }
      })
  },
  // C.2) GET movie comments
  getViews: ({ dispatch, commit }) => {
    userService
      .getview()
      .then(response => {
        commit
        const notification = {
          type: response.data.status,
          message: 'TEST ONLY_Views loaded',
        }
        dispatch('Notifications/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was an issue while loading views',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({ name: '404', params: { resource: 'getting views' } })
          } else if (error.response.status === 403) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
          }
        } else {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        }
      })
  },
}

// getters
const getters = {
  storeComments(state) {
    return state.comments
  },
  storeMovies: state => {
    return state.movies
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
