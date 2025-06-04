import { useMutation } from "@tanstack/react-query"

import AuthService from "../api/auth"
import { useContext } from "react"
import { AuthContext } from "../context/auth-provider"
import api from "../api"

export function useLoginMutation() {
  const mutation = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string
      password: string
    }) => {
      return AuthService.login(username, password)
    },
  })
  return mutation
}

export function useInterceptToken() {
  const context = useContext(AuthContext)
  api.interceptors.request.use((config) => {
    const token = context?.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
}
