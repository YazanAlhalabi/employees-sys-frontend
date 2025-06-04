import { useQuery } from "@tanstack/react-query"
import EmployeeService from "@/api/employee"
import { Employee } from "../schema/employees"
import { ErrorResponse, Paginated, SuccessResponse } from "../types"
import { useInterceptToken } from "./auth"

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
