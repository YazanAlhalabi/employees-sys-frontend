import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EmployeeService from "@/service/employee"
import { ErrorResponse, Paginated, SuccessResponse } from "@/types";
import { Employee, EmployeeCreate, EmployeeUpdate,  } from "@/schema/employee";
import { useInterceptToken } from "./auth";


export function useFindAllEmployee(){
    useInterceptToken()
    const {data,error,isLoading,status} = useQuery<
    SuccessResponse<Paginated<Employee[]>>,
    ErrorResponse>
    ({
        queryKey:["employees"],
        queryFn:EmployeeService.findAll,

    })
    return {data,error,isLoading,status};
}
export function useFindEmployee(employeeId:string){
    useInterceptToken()
    const {data,error,isLoading,status} = useQuery<
    SuccessResponse<Employee>,
    ErrorResponse>
    ({
        queryKey:["employees"],
        queryFn:()=>EmployeeService.findOne(employeeId),

    })
    return {data,error,isLoading,status};
}

export function useCreateEmployeeMutation(){
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn:(employee:EmployeeCreate)=>{
            return EmployeeService.createOne(employee)
        },
        onSuccess:()=>{
            return queryClient.invalidateQueries({
                queryKey:["employees"]
            })
        }
    });
    return mutation;
}
export function useUpdateEmployeeMutation(){
    useInterceptToken()

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn:({employee,employeeId}:{employee:EmployeeUpdate,employeeId:string})=>{
            return EmployeeService.updateOne(employee,employeeId)
        },
        onSuccess:()=>{
            return queryClient.invalidateQueries({
                queryKey:["employees"]
            })
        }
    });
    return mutation;
}
export function useDeleteEmployeeMutation(){
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn:(id:string)=>{
            return EmployeeService.deleteOne(id)
        },
        onSuccess:()=>{
            return queryClient.invalidateQueries({
                queryKey:["employees"]
            })
        }
    })
    return mutation;
    
}