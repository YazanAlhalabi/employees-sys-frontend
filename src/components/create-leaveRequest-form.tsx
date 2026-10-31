import { ChangeEvent, FormEvent, useContext, useState } from "react"
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

import { EmployeeCreate, employeeCreateSchema } from "../schema/employee"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { useCreateLeaveRequestMutation } from "@/feature/leave-request"
import { LeaveRequestCreate, leaveRequestCreateSchema } from "@/schema/leave-request"
import { AuthContext } from "@/context/auth-provider"
import { validateToken } from "@/lib/utils"

export function CreateLeaveRequestForm() {
  const handleCreateLeaveRequest = useCreateLeaveRequestMutation()

  const context = useContext(AuthContext);
    const validatetoken = validateToken(context?.token || " ")
  
    const {payload} = validatetoken;
    const employeeId = payload?.userId

  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const [state, setState] = useState<LeaveRequestCreate>({
    startDate:"",
    endDate:"",
    reason:""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value,
    })
  }
  const handleSelectStartDate = (date: Date | undefined) => {
    console.log("date:", date)
    const formattedDate = date ? format(date as Date, "yyyy-MM-dd") : ""
    setStartDate(date)
    setState({
      ...state,
      startDate: formattedDate,
    })
  }
  const handleSelectEndDate = (date: Date | undefined) => {
    console.log("date:", date)
    const formattedDate = date ? format(date as Date, "yyyy-MM-dd") : ""
    setEndDate(date)
    setState({
      ...state,
      endDate: formattedDate,
    })
  }

  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validatedState = leaveRequestCreateSchema.safeParse(state)
    if (validatedState.success) {
      const res = await handleCreateLeaveRequest.mutateAsync({
        
          leaveRequest: validatedState.data,
          employeeId: employeeId!,
        
      })
      console.log("res:", res)
    }
  }

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>Create New Leave Request</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='reason'>Reason</Label>
            <Input
              id='reason'
              name='reason'
              placeholder='Enter their reason'
              defaultValue={state.reason}
              onChange={handleChange}
              required
            />
          </div>
         
          <div className='space-y-2'>
            <Label>Start date</Label>
            <Popover modal>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full justify-start text-left font-normal'
                >
                  <Calendar className='mr-2 h-4 w-4' />
                  {startDate ? format(startDate, "dd.MM.yyyy") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <CalendarComponent
                  mode='single'
                  selected={startDate}
                  onSelect={handleSelectStartDate}
                  // initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className='space-y-2'>
            <Label>End date</Label>
            <Popover modal>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full justify-start text-left font-normal'
                >
                  <Calendar className='mr-2 h-4 w-4' />
                  {endDate ? format(endDate, "dd.MM.yyyy") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <CalendarComponent
                  mode='single'
                  selected={endDate}
                  onSelect={handleSelectEndDate}
                  // initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
        <CardFooter>
          <Button type='submit' className='mt-10 w-full'>
            Create Leave Request
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}