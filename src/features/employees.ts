import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import EmployeeService from "@/api/employee"
import { Employee, EmployeeCreate } from "@/schema/employees"
import { ErrorResponse, Paginated, SuccessResponse } from "@/types"
import { useInterceptToken } from "@/features/auth"

export function useFindAllEmployee() {
  useInterceptToken()

  const { data, error, isLoading, status } = useQuery<
    SuccessResponse<Paginated<Employee[]>>,
    ErrorResponse
  >({
    queryKey: ["employees"],
    queryFn: EmployeeService.findAll,
  })

  console.log("error:", error)
  return { data, error, isLoading, status }
}

export function useCreateEmployeeMutation() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (employee: EmployeeCreate) => {
      return EmployeeService.createOne(employee)
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["employees"],
      })
    },
  })
  return mutation
}
