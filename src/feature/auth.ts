import { useMutation } from "@tanstack/react-query";
import AuthService from '../service/auth'
import { useContext } from "react";
import { AuthContext } from "@/context/auth-provider";
import api from "@/api";
import { config } from "zod";
import { SingupDetails } from "@/schema/auth";
import { ResetDetails } from "@/types";

export function useLoginMutation(){
    const mutation = useMutation({
        mutationFn:({username,password}:{username:string,password:string})=>{
            return AuthService.login(username,password);

        }
    });
    return mutation;
}

export function useCreateAccount(){
    const mutation = useMutation({
        mutationFn:(singupDetails:SingupDetails)=>{
            return AuthService.signup(singupDetails)
        }
    })
    return mutation;
}
export function useForgotPassword(){
    const mutation = useMutation({
        mutationFn:(username:string)=>{
            return AuthService.forgetPassword(username)
        }
    })
    return mutation
}
export function useResetPassword(){
    const mutation = useMutation({
        mutationFn:(resetDetails:ResetDetails)=>{
            return AuthService.resetPassowrd(resetDetails)
        }
    })
    return mutation
    
}
export function useInterceptToken(){
    const context = useContext(AuthContext);
    api.interceptors.request.use((config)=>{
        const token = context?.token
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    })
}