import api from "."

import { SuccessResponse } from "../types"
import { Department } from "../schema/department"

export default {
  findAll: async (): Promise<SuccessResponse<Department[]>> => {
    const res = await api.get("/departments")
    return res.data
  },
}
