import axios from "axios";

const API = axios.create({
  baseURL: "https://todobackend-9cbf.onrender.com",
  withCredentials: true
});

export default API;