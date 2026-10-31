import { useQuery } from "@tanstack/react-query"
import ToDoService from "../service/todos"

export function useGetTodos(){
    const query = useQuery({
    queryKey:["todo"],
    queryFn: ToDoService.getAll
  })
  return query
}