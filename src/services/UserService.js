import axios from "axios";

const apiCLient = axios.create({
  baseURL: "https://hypertube42.herokuapp.com/users/user",
  withCredentials: false, //default value
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-type": "application/x-www-form-urlencoded"
  }
});
export default {
  register(userInfo) {
    return apiCLient.post("/", userInfo);
  },
  getUser(username) {
    return apiCLient.put(`/${username}`);
  }
};
