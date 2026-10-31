import { AxiosInstance } from "axios";
import { ServerError } from "./server-error";

export function setUpInterceptore(api:AxiosInstance){
    api.interceptors.response.use(
        (res)=>res,
        (error)=>{
            if(error.response.status===403){
                const servererror = new ServerError([{message:"Access Denied"}])
                return Promise.reject(servererror)
            }
            if(error.response.status===404){
                const servererror = new ServerError([{message:"Rescouce Not Found"}])
                return Promise.reject(servererror)
            }
            if(error.response.data.errors){
                const servererror = new ServerError(error.response.data.errors)
                return Promise.reject(servererror)
            }
        }
    )
}