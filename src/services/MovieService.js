import axios from "axios";

const apiCLient = axios.create({
  baseURL: "https://yts.mx/api/v2",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json"
  }
});

export default {
  getMovies() {
    return apiCLient.get("/list_movies.json");
  }
};
