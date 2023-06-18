import axios from "axios";
const baseURL = "https://localhost:44341/api/v1/";
const instanceAxios = axios.create({
  baseURL
});

export default instanceAxios;
