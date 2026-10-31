import api from "@/api"
import { Employee, EmployeeCreate, EmployeeUpdate,  } from "@/schema/employee";
import { Paginated, SuccessResponse } from "@/types";

export default {
    findAll: async():Promise<SuccessResponse<Paginated<Employee[]>>>=>{

        const res = await api.get("/employees")

        return res.data;

    },
    findOne: async(employeeId:string):Promise<SuccessResponse<Employee>>=>{

        const res = await api.get(`/employees/${employeeId}`)

        return res.data;

    },
    createOne:async(employee:EmployeeCreate):Promise<SuccessResponse<Paginated<Employee>>>=>{
        const res = await api.post("/employees",employee)
        return res.data
    },
    deleteOne:async(id:string)=>{
        const res = await api.delete(`/employees/${id}`)
        return res.data
    },
    updateOne:async(employee:EmployeeUpdate,employeeId:string):Promise<SuccessResponse<Paginated<Employee>>>=>{
        const res = await api.put(`/employees/${employeeId}`,employee)
        return res.data
    },
}