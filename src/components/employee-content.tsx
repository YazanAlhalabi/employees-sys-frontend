import { PencilIcon} from "lucide-react"
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { UpdateEventForm } from "./update-employee-form"
import Department from "./department"

export function EmployeeContent({ employee }: { employee: Employee }) {
  // If data hasn't loaded yet, show a clean loading message instead of crashing
  if (!employee) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          Loading employee information...
        </CardContent>
      </Card>
    );
  }


  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle>Your info</CardTitle>
        <CardDescription>
          Manage your  information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Hire Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

                <TableRow key={employee.id}>
                  <TableCell className='font-medium'>
                    <div className='flex items-center gap-2'>
                      <Avatar className='h-8 w-8'>
                        <AvatarFallback className='bg-yellow-100 text-yellow-800'>
                          {employee.firstName[0]}
                          {employee.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      {employee.firstName} {employee.lastName}
                    </div>
                  </TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Badge
                      variant='outline'
                      className='bg-blue-50 text-blue-700 hover:bg-blue-50'
                    >
                      <Department id={employee.departmentId}/>
                    </Badge>
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    {new Date(employee.hireDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Dialog>
                  <DialogTrigger asChild>
                
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <PencilIcon className='h-4 w-4' />
                        <span className='sr-only'>Edit</span>
                      </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                      <DialogTitle>update employee</DialogTitle>
                    </DialogHeader>
                    <UpdateEventForm employee={employee}/>
                  </DialogContent>
                </Dialog>
                      
                      
                
                    </div>
                  </TableCell>
                </TableRow>

          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}