import { useState } from "react"

import { BriefcaseIcon, LockIcon, PlusIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SideBar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { EmployeesContent } from "@/components/employees-content"
import { DepartmentsContent } from "@/components/departments-content"
import { UserAccountsContent } from "@/components/user-accounts-content"

// Mock data for employees
const employees = [
  {
    id: "e1",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone_number: "555-123-4567",
    hire_date: "2021-06-15",
    position: "Software Engineer",
    department: "Engineering",
  },
  {
    id: "e2",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    phone_number: "555-987-6543",
    hire_date: "2020-03-10",
    position: "Product Manager",
    department: "Product",
  },
  {
    id: "e3",
    first_name: "Michael",
    last_name: "Johnson",
    email: "michael.j@example.com",
    phone_number: "555-456-7890",
    hire_date: "2022-01-05",
    position: "UX Designer",
    department: "Design",
  },
  {
    id: "e4",
    first_name: "Emily",
    last_name: "Williams",
    email: "emily.w@example.com",
    phone_number: "555-789-0123",
    hire_date: "2021-11-20",
    position: "Marketing Specialist",
    department: "Marketing",
  },
  {
    id: "e5",
    first_name: "David",
    last_name: "Brown",
    email: "david.b@example.com",
    phone_number: "555-234-5678",
    hire_date: "2019-08-12",
    position: "HR Manager",
    department: "Human Resources",
  },
]

// Mock data for departments
const departments = [
  { id: "d1", name: "Engineering", employee_count: 12 },
  { id: "d2", name: "Product", employee_count: 8 },
  { id: "d3", name: "Design", employee_count: 6 },
  { id: "d4", name: "Marketing", employee_count: 5 },
  { id: "d5", name: "Human Resources", employee_count: 4 },
  { id: "d6", name: "Finance", employee_count: 3 },
]

// Mock data for user accounts
const userAccounts = [
  {
    id: "u1",
    username: "john.doe",
    role: "Employee",
    employee_name: "John Doe",
    status: "Active",
  },
  {
    id: "u2",
    username: "jane.smith",
    role: "Manager",
    employee_name: "Jane Smith",
    status: "Active",
  },
  {
    id: "u3",
    username: "michael.j",
    role: "Employee",
    employee_name: "Michael Johnson",
    status: "Inactive",
  },
  {
    id: "u4",
    username: "emily.w",
    role: "Employee",
    employee_name: "Emily Williams",
    status: "Active",
  },
  {
    id: "u5",
    username: "david.b",
    role: "Manager",
    employee_name: "David Brown",
    status: "Active",
  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("employees")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter employees based on search term
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='flex h-screen'>
      <SideBar setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className='flex flex-1 flex-col overflow-hidden'>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <main className='flex-1 overflow-auto p-4 lg:p-6'>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='w-full'
          >
            <div className='flex items-center justify-between'>
              <TabsList>
                <TabsTrigger value='employees' className='relative'>
                  Employees
                  <UserIcon className='ml-2 h-4 w-4 text-yellow-500' />
                </TabsTrigger>
                <TabsTrigger value='departments'>
                  Departments
                  <BriefcaseIcon className='ml-2 h-4 w-4 text-blue-500' />
                </TabsTrigger>
                <TabsTrigger value='accounts'>
                  User Accounts
                  <LockIcon className='ml-2 h-4 w-4 text-red-500' />
                </TabsTrigger>
              </TabsList>
              <div className='flex items-center gap-2'>
                <Select defaultValue='all'>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Filter by department' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button>
                  <PlusIcon className='mr-2 h-4 w-4' />
                  Add New
                </Button>
              </div>
            </div>

            <TabsContent value='employees' className='border-none p-0 pt-4'>
              <EmployeesContent employees={filteredEmployees} />
            </TabsContent>

            <TabsContent value='departments' className='border-none p-0 pt-4'>
              <DepartmentsContent departments={departments} />
            </TabsContent>

            <TabsContent value='accounts' className='border-none p-0 pt-4'>
              <UserAccountsContent userAccounts={userAccounts} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
