import axios from "axios";
import { setUpInterceptore } from "./interceptose";

const isProduction = import.meta.env.MODE === "production"

export let BASE_URL = "http://localhost:8080"

if(isProduction){
    BASE_URL = "http://localhost:8080"
}

const api = axios.create(
    {baseURL :BASE_URL}
);
setUpInterceptore(api);
export default api