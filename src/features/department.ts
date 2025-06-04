import { useQuery } from "@tanstack/react-query"

import { useInterceptToken } from "@/features/auth"
import { Department } from "@/schema/department"
import DepartmentService from "@/api/department"
import { ErrorResponse, SuccessResponse } from "@/types"

export function useFindAllDepartments() {
  useInterceptToken()

  const { data, error, isLoading, status } = useQuery<
    SuccessResponse<Department[]>,
    ErrorResponse
  >({
    queryKey: ["departments"],
    queryFn: DepartmentService.findAll,
  })

  console.log("error:", error)
  return { data: data?.data || [], error, isLoading, status }
}
