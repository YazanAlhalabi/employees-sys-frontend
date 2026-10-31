import api from "@/api"
import { LeaveRequest, LeaveRequestCreate } from "@/schema/leave-request"
import { SuccessResponse } from "@/types"

export default {
    getAllLeaveRequest:async(employeeId:string):Promise<SuccessResponse<LeaveRequest[]>>=>{
        const res = await api.get(`/employees/${employeeId}/leave-requests`)
        return res.data;
    },
    addOne:async(leaveRequest : LeaveRequestCreate,employeeId:string):Promise<SuccessResponse<LeaveRequest>>=>{
        const res = await api.post(`/employees/${employeeId}/leave-requests`,leaveRequest)
        return res.data

    }
}