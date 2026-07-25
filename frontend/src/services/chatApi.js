import axios from "axios";

const API = "https://ecommerce-7jru.onrender.com/chatbot/";

export const askChatbot = async (message) => {
    const response = await axios.post(API, { message });
    return response.data;
};