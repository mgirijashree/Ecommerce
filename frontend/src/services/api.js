import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-7jru.onrender.com/api/",
});

export default api;