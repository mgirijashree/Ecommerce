import axios from "axios";

const API = axios.create({
    baseURL: "https://ecommerce-7jru.onrender.com",
});

export default API;