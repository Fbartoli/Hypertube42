import axios from "axios";
import nProgress from "nprogress";

const apiCLient = axios.create({
  baseURL: "https://yts.mx/api/v2",
  withCredentials: false, //default value
  headers: {
    Accept: "application/json",
    "Content-type": "application/json"
  }
});
apiCLient.interceptors.request.use(config => {
  nProgress.start();
  return config;
});

apiCLient.interceptors.response.use(response => {
  nProgress.done();
  return response;
});

export default {
  getMovies() {
    return apiCLient.get("/list_movies.json");
  }
};
