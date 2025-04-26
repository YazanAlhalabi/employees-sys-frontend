import api from "."

export default {
  getAll: async () => {
    const res = await api.get("/todos")
    return res.data
  },
}
