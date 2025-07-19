import api from "."
import { SignupDetails } from "../schema/auth"

export default {
  login: async (username: string, password: string) => {
    const res = await api.post("/auth/login", { username, password })

    return res.data
  },
  signup: async (signupDetails: SignupDetails) => {
    const res = await api.post(`/auth/signup?token=${signupDetails.token}`, {
      username: signupDetails.username,
      password: signupDetails.password,
    })

    return res.data
  },
}
