import { PencilIcon, TrashIcon, Loader2Icon ,PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Employee } from "@/schema/employee"
import { useDeleteEmployeeMutation } from "@/feature/employee"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { UpdateEventForm } from "./update-employee-form"
import Department from "./department"
import type { LeaveRequest } from "@/schema/leave-request"
import { CreateLeaveRequestForm } from "./create-leaveRequest-form"

export function LeaveRequest({ leaveRequests }: { leaveRequests: LeaveRequest[] }) {
  // Destructure `mutate` and rename it, or use `deleteEmployee.mutate(id)`
  const { mutate: deleteEmployee, variables: deletingId, isPending } = useDeleteEmployeeMutation()



  return (
    <Card>
      <CardHeader className='pb-2'>
        <div className="flex justify-between items-center w-full">
        <CardTitle>Leave Requests</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
        
            <Button variant='ghost' size='icon' className='h-8 w-8'>
                <PlusCircle className='h-4 w-4' />
                <span className='sr-only'>Add</span>
              </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Add your leave request</DialogTitle>
            </DialogHeader>
            <CreateLeaveRequestForm/>
          </DialogContent>
        </Dialog>
        </div>
        <CardDescription>
          Add your Leave Request
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Reason</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaveRequests.map((leaveRequest) => {
              // Check if this specific row is currently being deleted
              const isDeletingThis = isPending && deletingId === leaveRequest.id

              return (
                <TableRow key={leaveRequest.id}>
                  <TableCell>{leaveRequest.startDate}</TableCell>
                  <TableCell>{leaveRequest.endDate}</TableCell>
                  <TableCell>{leaveRequest.reason}</TableCell>

                  
                    <div className='flex items-center gap-2'>
                      
                      
                      
                      
                    </div>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}