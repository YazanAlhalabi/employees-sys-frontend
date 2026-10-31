import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {jwtDecode} from "jwt-decode"
import { tokenSchema } from "@/schema/auth"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateToken(token:string){
  if(!token || typeof token !== "string"){
    return {valid:false,reason:"Token is missing or not a string"}
  }
  try{
    const decode = jwtDecode(token)
    const validatedToekn = tokenSchema.parse(decode)
    const now = Math.floor(Date.now()/1000);
    if(validatedToekn.exp < now){
      return {valid:false,reason:"Token has expire"}
    }
    return {valid:true,payload:validatedToekn}

  }catch(err){
    console.log("err :",err)
    return {valid:false,reason:"Invalid token format or decoding faild"}


  }
}