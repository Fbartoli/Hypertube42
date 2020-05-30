import axios from 'axios'

const apiCLientStream = axios.create({
  // baseURL: 'https://hypertube.yolvhi.net',
  baseURL: 'http://localhost:3000',
  withCredentials: false, //default value
  // timeout: 20000,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
})
export default {
  getstream({ magnetHash, id }) {
    return apiCLientStream.get(`/torrent/${magnetHash}?id=${id}`)
  },
  getstreamformats({ magnetHash }) {
    return apiCLientStream.get(`/torrent/mime/${magnetHash}`)
  },
}
