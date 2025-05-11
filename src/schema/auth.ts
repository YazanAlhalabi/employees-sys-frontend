import { z } from "zod"

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(3, "Password must be at least 3 characters long"),
})

export type LoginCredentials = z.infer<typeof loginSchema>

export type LoginErrors = {
  [K in keyof LoginCredentials]?: string[]
}
