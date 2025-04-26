import { useQuery } from "@tanstack/react-query"
import TodosService from "../api/todos"

export function useGetTodos() {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: TodosService.getAll,
  })

  return query
}
