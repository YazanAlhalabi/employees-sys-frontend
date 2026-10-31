import { ChangeEvent, FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


import {  employeeUpdateSchema } from "../schema/employee"

import { useCreateDepartment, } from "../feature/department"
import { DepartmentCreate, departmentCreateSchema } from "@/schema/department"

export function CreateDepartmentEventForm() {
  const handleCreateDepartment = useCreateDepartment()

  const [state, setState] = useState<DepartmentCreate>({
    name:""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value,
    })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log("state",state)
    const validatedState = departmentCreateSchema.safeParse(state)
    if (validatedState.success) {
      const res = await handleCreateDepartment.mutateAsync(validatedState.data)
      console.log("res:", res)
    }
  }

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>Create New Department</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Department Name</Label>
            <Input
              id='name'
              name='name'
              placeholder='Enter Deartment  Name'
              defaultValue={state.name}
              onChange={handleChange}
              required
            />
          </div>
          
        </CardContent>
        <CardFooter>
          <Button type='submit' className='mt-10 w-full'>
            Create Department
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}