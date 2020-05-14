import axios from 'axios'

const apiCLient = axios.create({
  baseURL: 'https://yts.mx/api/v2',
  withCredentials: false, //default value
  timeout: 20000,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
})
export default {
  getMovies(perPage, page) {
    return apiCLient.get(`/list_movies.json?limit=${perPage}&page=${page}`)
  },
  getMovie(id) {
    return apiCLient.get(`/movie_details.json?movie_id=${id}`)
  },
}
