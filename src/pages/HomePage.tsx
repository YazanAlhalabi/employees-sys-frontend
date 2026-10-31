import { useContext, useState } from "react"

import { BriefcaseIcon, UserIcon } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SideBar } from "@/components/sidebar"
import { Header } from "@/components/header"

import {  useFindEmployee } from "@/feature/employee"

import { EmployeeContent } from "@/components/employee-content"
import { useParams } from "react-router"
import { AuthContext } from "@/context/auth-provider"
import { validateToken } from "@/lib/utils"
import { SuccessResponse } from "@/types"
import { LeaveRequest } from "@/components/leave-request"
import useGetAllLeaveRequest from "@/feature/leave-request"
import { LogoutButton } from "@/components/LogoutButton"




export default function HomePage() {
  
  const [activeTab, setActiveTab] = useState("employees")

  const context = useContext(AuthContext);
  const validatetoken = validateToken(context?.token || " ")

  const {payload} = validatetoken;
  const employeeId = payload?.userId

  const {data:response,isLoading} = useFindEmployee(employeeId!)
  const {data:response2,isLoading:loadingLeaveRequest} = useGetAllLeaveRequest(employeeId!)

  const employee = response?.data || {
  departmentId: "",
  email: "",
  id: "",
  firstName: "",
  lastName: "",
  hireDate: "",
  phoneNumber: "",
  position: "",
  verified: false,
};
const leaveRequests = response2?.data || []
console.log(employee)
console.log(leaveRequests)

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading your profile...</p>
      </div>
    );
  }
  

  return (
    <div className='flex h-screen'>

      <div className='flex flex-1 flex-col overflow-hidden'>

        <main className='flex-1 overflow-auto p-4 lg:p-6'>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='w-full'
          >
            <div className='flex items-center justify-between'>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-200 dark:text-white sm:text-4xl">EMS</h1>

              <TabsList>
                <TabsTrigger value='logout' className='relative'>
                  <LogoutButton/>
                </TabsTrigger>
                <TabsTrigger value='employees' className='relative'>
                  Employee Details
                  <UserIcon className='ml-2 h-4 w-4 text-yellow-500' />
                </TabsTrigger>
                <TabsTrigger value='leaveRequests'>
                  Leave Request
                  <BriefcaseIcon className='ml-2 h-4 w-4 text-blue-500' />
                </TabsTrigger>
                
              </TabsList>
              
            </div>

            <TabsContent value='employees' className='border-none p-0 pt-4'>
              {employee ? (
            <EmployeeContent employee={employee} />
          ) : (
            <p>No employee data found.</p>
          )}
            </TabsContent>

            <TabsContent value='leaveRequests' className='border-none p-0 pt-4'>
              <LeaveRequest leaveRequests={leaveRequests} />
            </TabsContent>

            
          </Tabs>
        </main>
      </div>
    </div>
  )
}
