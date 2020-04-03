import axios from "axios";

const apiCLient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false, //default value
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json"
  }
});
export default {
  register(userInfo) {
    return apiCLient.post(`/register`, userInfo);
  }
};
