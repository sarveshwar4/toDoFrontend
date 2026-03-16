import axios from "axios";

const API = axios.create({
  baseURL: "https://todobackend-9cbf.onrender.com",
  // baseURL: "http://localhost:4444",
  withCredentials: true
});

export default API;