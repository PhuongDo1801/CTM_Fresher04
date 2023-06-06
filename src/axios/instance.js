import axios from "axios";
const baseURL = "http://localhost:3000";
const instanceAxios = axios.create({
  baseURL
});

export default instanceAxios;
