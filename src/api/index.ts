import axios from "axios"

const isProduction = import.meta.env.MODE === "production"
export let BASE_URL = "https://jsonplaceholder.typicode.com"

if (isProduction) {
  BASE_URL = "https://jsonplaceholder.typicode.com"
}

const api = axios.create({
  baseURL: BASE_URL,
})

export default api
