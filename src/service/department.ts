import api from "@/api";
import { Department, DepartmentCreate } from "@/schema/department";
import {  SuccessResponse } from "@/types";

export default{
    findAll: async():Promise<SuccessResponse<Department[]>>=>{

        const res = await api.get("/departments");
        return res.data;

    },
    findOne: async(departmentId:string):Promise<SuccessResponse<Department>>=>{

        const res = await api.get(`/departments/${departmentId}`);
        return res.data;

    },
    createOne:async(department:DepartmentCreate):Promise<SuccessResponse<Department>>=>{
        const res = await api.post("/departments",department);
        return res.data;

    },
    deleteOne:async(departmentId:string)=>{
        const res = await api.delete(`/departments/${departmentId}`)
        return res.data;
    }
}