import { useMutation } from "@tanstack/react-query"

import AuthService from "../api/auth"

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
