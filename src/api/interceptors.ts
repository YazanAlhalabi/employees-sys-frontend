import { AxiosInstance } from "axios"
import { ServerError } from "./server-error"

export function setupInterceptors(api: AxiosInstance) {
  api.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response.status === 500) {
        const serverError = new ServerError([
          { message: "Server is down... Try again!" },
        ])
        return Promise.reject(serverError)
      }
      if (error.response.status === 403) {
        const serverError = new ServerError([{ message: "Access deined" }])
        return Promise.reject(serverError)
      }
      if (error.response.data.errors) {
        const serverError = new ServerError(error.response.data.errors)
        return Promise.reject(serverError)
      }

      const serverError = new ServerError([
        { message: "Something went wrong, try again!" },
      ])
      return Promise.reject(serverError)
    }
  )
}
