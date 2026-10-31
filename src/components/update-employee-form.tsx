import { ChangeEvent, FormEvent, useState } from "react"
import { format } from "date-fns"

import { Calendar } from "lucide-react"
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
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {  Employee, EmployeeUpdate, employeeUpdateSchema } from "../schema/employee"

import {  useUpdateEmployeeMutation } from "../feature/employee"

export function UpdateEventForm({employee}:{employee:Employee}) {
  const handleUpdateEmployee = useUpdateEmployeeMutation()

  const [date, setDate] = useState<Date>()
  const [state, setState] = useState<EmployeeUpdate>({
    firstName: employee.firstName,
    lastName: employee.lastName,
    position: employee.position,
    hireDate: employee.hireDate,
    phoneNumber: employee.phoneNumber,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value,
    })
  }
  const handleSelectDate = (date: Date | undefined) => {
    console.log("date:", date)
    const formattedDate = date ? format(date as Date, "yyyy-MM-dd") : ""
    setDate(date)
    setState({
      ...state,
      hireDate: formattedDate,
    })
  }

  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validatedState = employeeUpdateSchema.safeParse(state)
    if (validatedState.success) {
      const res = await handleUpdateEmployee.mutateAsync({
          employee: validatedState.data,
          employeeId: employee.id, // <-- Passed here successfully!
        })
      console.log("res:", res)
    }
  }

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>Update Event</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='firstName'>First Name</Label>
            <Input
              id='firstName'
              name='firstName'
              placeholder='Enter their first name'
              defaultValue={state.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='lastName'>Last Name</Label>
            <Input
              id='lastName'
              name='lastName'
              placeholder='Enter their last name'
              defaultValue={state.lastName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className='space-y-2'>
            <Label htmlFor='position'>Position</Label>
            <Input
              id='position'
              name='position'
              placeholder='Enter their position'
              defaultValue={state.position}
              onChange={handleChange}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='phoneNumber'>Phone Number</Label>
            <Input
              id='phoneNumber'
              name='phoneNumber'
              placeholder='Enter their Phone Number'
              defaultValue={state.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          

          <div className='space-y-2'>
            <Label>Hire date</Label>
            <Popover modal>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full justify-start text-left font-normal'
                >
                  <Calendar className='mr-2 h-4 w-4' />
                  {date ? format(date, "dd.MM.yyyy") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <CalendarComponent
                  mode='single'
                  selected={date}
                  onSelect={handleSelectDate}
                  // initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
        <CardFooter>
          <Button type='submit' className='mt-10 w-full'>
            Update Employee
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}