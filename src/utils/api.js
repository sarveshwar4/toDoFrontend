import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4444",
  // baseURL: "https://todobackend-9cbf.onrender.com",
  withCredentials: true
});

export default API;

  // baseURL: "http://localhost:4444",