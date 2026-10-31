import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useInterceptToken } from "./auth";
import { ErrorResponse,  SuccessResponse } from "@/types";
import { Department, DepartmentCreate } from "@/schema/department";
import DepartmentService from "@/service/department"

export function useFindAllDepartments(){
    useInterceptToken()
    const {data,error,isLoading,status} = useQuery<
    SuccessResponse<Department[]>,
    ErrorResponse
    >({
        queryKey:["departments"],
        queryFn:DepartmentService.findAll
    })
    console.log("error department",error)
    return {data:data?.data || [],error,isLoading,status}

}
export function useFindDepartment(departmentId: string) {
    // Optional: useInterceptToken() if you use it in your app
    
    const { data, error, isLoading, status } = useQuery<
        SuccessResponse<Department>,
        ErrorResponse
    >({
        // Include departmentId in the queryKey so it caches per department
        queryKey: ["departments", departmentId],
        queryFn: () => DepartmentService.findOne(departmentId),
        // Only run the query if a departmentId is actually provided
        enabled: !!departmentId, 
    });

    console.log("error department single:", error);

    return { 
        department: data?.data || null, 
        error, 
        isLoading, 
        status 
    };
}

export function useCreateDepartment(){
    useInterceptToken()

    const query = useQueryClient()
    const mutation = useMutation({
        mutationFn:(department:DepartmentCreate)=>{
            return DepartmentService.createOne(department)

        },
        onSuccess:()=>{
            return query.invalidateQueries({
                queryKey:["departments"]
            })
        }
    });
    return mutation;
}
export function useDeleteDepartmentMutation(){
    useInterceptToken()

    const query = useQueryClient();
    const mutation = useMutation({
        mutationFn:(departmentId:string)=>{
            return DepartmentService.deleteOne(departmentId)
        },
        onSuccess:()=>{
            return query.invalidateQueries({
                queryKey:["departments"]
            })
        }
    });
    return mutation;
}