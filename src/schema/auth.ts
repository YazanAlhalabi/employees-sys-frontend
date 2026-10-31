import {z} from "zod";

export const loginSchema = z.object({
    username:z.string().min(3,"user name must at least 3 char"),
    password:z.string().min(3,"passwrod must at least 3 char")
});

export type LoginCredentials = z.infer<typeof loginSchema>

export type LoginErrors = {
    [K in keyof LoginCredentials]?: string[]
}

export const tokenSchema = z.object({
    iat:z.number(),
    exp:z.number(),
    role:z.string(),
    userId:z.string()
});
export type Token = z.infer<typeof tokenSchema>

export const singupSchema = z.object({
    token:z.string({message:"Account creation is missing"}),
    username:z.string().min(3,"Username must Be at least 3 char"),
    password:z.string().min(3,"Password must Be at least 3 char")
})
export type SingupDetails = z.infer<typeof singupSchema>