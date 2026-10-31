import { BriefcaseIcon, MoreVerticalIcon, PlusIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { CreateEventForm } from "./create-employee-form"
import { Department } from "@/schema/department"
import { CreateDepartmentEventForm } from "./create-department-form"
import {  useDeleteDepartmentMutation } from "@/feature/department"

export function DepartmentsContent({ departments }: any) {
  const { mutate: deleteDepartment } = useDeleteDepartmentMutation()
  return (
    <Card>
      <CardHeader className='pb-2'>
        <div className="flex justify-between items-center w-full">
        <CardTitle>
          Department Management
          
          </CardTitle>
          <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='outline'>
                      <PlusIcon className='mr-2 h-4 w-4' />
                      Add New
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                      <DialogTitle>Create new department</DialogTitle>
                    </DialogHeader>
                    <CreateDepartmentEventForm />
                  </DialogContent>
                </Dialog>
                </div>
        <CardDescription>
          Manage your departments and assign employees.
        </CardDescription>
        
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {departments.map((department:Department) => (
            <Card key={department.id}>
              <CardHeader className='pb-2'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-lg flex items-center'>
                    <BriefcaseIcon className='mr-2 h-5 w-5 text-blue-500' />
                    {department.name}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <MoreVerticalIcon className='h-4 w-4' />
                        <span className='sr-only'>Menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      {/* <DropdownMenuItem>Edit Department</DropdownMenuItem>
                      <DropdownMenuItem>View Employees</DropdownMenuItem>
                      <DropdownMenuSeparator /> */}
                      <DropdownMenuItem className='text-red-600' onClick={()=>deleteDepartment(department.id)}>
                        Delete Department
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                {/* <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-500'>Employees:</span>
                  <Badge variant='secondary'>{department.employee_count}</Badge>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
