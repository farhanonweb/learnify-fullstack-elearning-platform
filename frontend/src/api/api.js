import axios from "axios";

const API = axios.create({
  baseURL: "https://learnify-backend-6xyz.onrender.com/api",
});

export default API;
