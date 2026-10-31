import z, { email } from "zod"

export const employeeSchema = z.object({
    departmentId : z.string(),
    email:z.string(),
    id:z.string(),
    firstName:z.string(),
    lastName:z.string(),
    hireDate:z.string(),
    phoneNumber:z.string(),
    position:z.string(),
    verified:z.boolean(),
});

export type Employee = z.infer<typeof employeeSchema>

export const employeeCreateSchema = employeeSchema.omit({
    id:true,
    verified:true
})

export type EmployeeCreate = z.infer<typeof employeeCreateSchema>

export const employeeUpdateSchema = employeeSchema.omit({
    id:true,
    verified:true,
    departmentId : true,
    email:true

})
export type EmployeeUpdate = z.infer<typeof employeeUpdateSchema>





