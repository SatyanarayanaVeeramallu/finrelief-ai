import axios from "axios";

const api = axios.create({
  baseURL: "https://finrelief-ai.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
