import axios from "axios"

const isProduction = import.meta.env.MODE === "production"
export let BASE_URL = "http://localhost:8080"

if (isProduction) {
  BASE_URL = "http://localhost:8080"
}

const api = axios.create({
  baseURL: BASE_URL,
})

export default api
