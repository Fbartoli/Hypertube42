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
  getMoviesFilterBy({ perPage, page, filter, order }) {
    console.log('perPage_', perPage)
    console.log('page_', page)
    console.log('filter_', filter)
    console.log('order_', order)
    return apiCLient.get(
      `/list_movies.json?limit=${perPage}&page=${page}&sort_by=${filter}&order_by=${order}`
    )
  },
}
