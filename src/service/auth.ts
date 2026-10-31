import api from "@/api"
import { SingupDetails } from "@/schema/auth";
import { ResetDetails } from "@/types";

export default {
    login: async(username:string,password:string)=>{
        const res = await api.post("/auth/login",{username,password})
        return res.data;
    },
    signup:async(singupDetails : SingupDetails)=>{
        const res = await api.post(`/auth/signup?token=${singupDetails.token}`,
            {
            username:singupDetails.username,
            password:singupDetails.password
            }
        );
        return res.data;

    },
    forgetPassword:async(username:string)=>{
        const res = await api.post(`/auth/forgot-password/${username}`)
        return res.data;
    },
    resetPassowrd:async(resetDetails:ResetDetails)=>{
        const res = await api.post(`/auth/reset-password`,resetDetails)
        return res.data;
    }
}