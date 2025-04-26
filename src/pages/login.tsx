import { FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon } from "lucide-react"
import { useGetTodos } from "../features/todos"

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const query = useGetTodos()

  // Sign in form state
  const [signinData, setSigninData] = useState({
    username: "",
    password: "",
  })

  console.log("query:", query)

  const handleSigninSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Here you would connect to your local authentication backend
    console.log("Sign in data:", signinData)
  }

  return (
    <div className='flex min-h-screen items-center justify-center  p-4'>
      <div className='w-full max-w-md'>
        <Card className='border-none shadow-lg'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold text-center'>
              Welcome back
            </CardTitle>
            <CardDescription className='text-center'>
              Enter your credentials to sign in to your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSigninSubmit}>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='signin-username'>Username</Label>
                <div className='relative'>
                  <UserIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
                  <Input
                    id='signin-username'
                    className='pl-10'
                    placeholder='Enter your username'
                    value={signinData.username}
                    onChange={(e) =>
                      setSigninData({
                        ...signinData,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='signin-password'>Password</Label>
                  <button
                    type='button'
                    className='text-sm text-gray-500 hover:text-gray-700'
                    onClick={() => {
                      /* Implement password reset */
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className='relative'>
                  <LockIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
                  <Input
                    id='signin-password'
                    type={showPassword ? "text" : "password"}
                    className='pl-10 pr-10'
                    placeholder='••••••••'
                    value={signinData.password}
                    onChange={(e) =>
                      setSigninData({
                        ...signinData,
                        password: e.target.value,
                      })
                    }
                  />
                  <button
                    type='button'
                    className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className='h-4 w-4' />
                    ) : (
                      <EyeIcon className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type='submit' className='w-full mt-5'>
                Sign In
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className='mt-6 text-center text-sm text-gray-500'>
          <p>
            Don't have an account?{" "}
            <button
              type='button'
              className='font-medium text-primary hover:underline'
              onClick={() => null}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
