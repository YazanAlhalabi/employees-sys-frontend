import {z} from "zod"
export const departmentSchema = z.object({
    id:z.string(),
    name:z.string()
})

export const departmentCreateSchema = departmentSchema.omit({
    id:true
})

export type DepartmentCreate = z.infer<typeof departmentCreateSchema>

export type Department = z.infer<typeof departmentSchema>