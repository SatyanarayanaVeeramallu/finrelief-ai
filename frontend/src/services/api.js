import axios from 'axios'

// Central Axios instance — all API calls in the app go through this.
const api = axios.create({
  baseURL: 'https://finrelief-ai.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// Basic response/error interceptor so every service gets consistent error info.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.detail ||
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong while contacting the server.'
    return Promise.reject(new Error(message))
  }
)

export default api
