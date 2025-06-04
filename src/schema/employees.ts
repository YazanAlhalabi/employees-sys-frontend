import z from "zod"

export const employeeSchema = z.object({
  departmentId: z.string(),
  email: z.string(),
  firstName: z.string(),
  hireDate: z.string(),
  id: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  position: z.string(),
  verified: z.boolean(),
})

export type Employee = z.infer<typeof employeeSchema>
