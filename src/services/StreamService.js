import axios from 'axios'

const apiCLientStream = axios.create({
  baseURL: 'https://hypertube.yolvhi.net',
  withCredentials: false, //default value
  timeout: 20000,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
})
export default {
  getstream(magnetHash) {
    return apiCLientStream.get(`/torrent/${magnetHash}`)
  },
}
