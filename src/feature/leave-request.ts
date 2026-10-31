import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useInterceptToken } from "./auth";
import { ErrorResponse, SuccessResponse } from "@/types";
import { LeaveRequest, LeaveRequestCreate } from "@/schema/leave-request";
import LeaveRequestService from "@/service/leave-request"

export default function useGetAllLeaveRequest(employeeId:string){
        useInterceptToken()
    
    const {data,error,isLoading,status}  = useQuery<
        SuccessResponse<LeaveRequest[]>,
        ErrorResponse>(
            {
            queryKey:["leaverequests"],
            queryFn:()=>LeaveRequestService.getAllLeaveRequest(employeeId),
            
            }
        );
    return {data,error,isLoading,status};


    
}

export function useCreateLeaveRequestMutation(){
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn:({leaveRequest,employeeId}:{leaveRequest:LeaveRequestCreate,employeeId:string})=>{
            return LeaveRequestService.addOne(leaveRequest,employeeId)
        },
        onSuccess:()=>{
            return queryClient.invalidateQueries({
                queryKey:["leaverequests"]
            })
        }
    });
    return mutation;
}
