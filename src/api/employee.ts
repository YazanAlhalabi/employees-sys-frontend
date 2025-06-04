import api from "."
import { Employee, EmployeeCreate } from "../schema/employees"
import { SuccessResponse, Paginated } from "../types"

export default {
  findAll: async (): Promise<SuccessResponse<Paginated<Employee[]>>> => {
    const res = await api.get("/employees?size=100")
    return res.data
  },
  createOne: async (
    employee: EmployeeCreate
  ): Promise<SuccessResponse<Employee>> => {
    const res = await api.post("/employees", employee)
    return res.data
  },
}
