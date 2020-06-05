import axios from 'axios'

const apiCLient = axios.create({
  baseURL: 'https://tv-v2.api-fetch.website',
  withCredentials: false, //default value
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
})
export default {
  getMovies(perPage, page) {
    return apiCLient.get(`/movies/${page}?sort=trending&order=1`)
  },
  getMovie(id) {
    return apiCLient.get(`/movie/${id}`)
  },
  getMoviesSearch(pageNumber, movie_title) {
    return apiCLient.get(
      `/movies/${pageNumber}?sort=trending&order=1&keywords=${movie_title}`
    )
  },
  getMoviesFilterBy({ page, sort, order }) {
    order = order === 'asc' ? 1 : -1
    sort = sort == 'date_added' ? sort : 'last_added'
    page = page == 0 ? (page = 1) : page
    return apiCLient.get(`/movies/${page}?sort=${sort}&order=${order}`)
  },
}
