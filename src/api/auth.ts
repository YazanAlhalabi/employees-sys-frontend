import api from "."

export default {
  login: async (username: string, password: string) => {
    const res = await api.post("/auth/login", { username, password })

    return res.data
  },
}
