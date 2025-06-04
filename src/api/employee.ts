import api from "."
import { Employee } from "../schema/employees"
import { SuccessResponse, Paginated } from "../types"

export default {
  findAll: async (): Promise<SuccessResponse<Paginated<Employee[]>>> => {
    const res = await api.get("/employees")
    return res.data
  },
}
