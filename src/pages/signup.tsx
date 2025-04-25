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

export function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSignupSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log("Sign up data:", signupData)
  }

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <Card className='border-none shadow-lg'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold text-center'>
              Create an account
            </CardTitle>
            <CardDescription className='text-center'>
              Enter your information to create a new account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSignupSubmit}>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='signup-username'>Username</Label>
                <div className='relative'>
                  <UserIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
                  <Input
                    id='signup-username'
                    className='pl-10'
                    placeholder='Choose a username'
                    value={signupData.username}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='signup-email'>Email</Label>
                <Input
                  id='signup-email'
                  type='email'
                  placeholder='m@example.com'
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='signup-password'>Password</Label>
                <div className='relative'>
                  <LockIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
                  <Input
                    id='signup-password'
                    type={showPassword ? "text" : "password"}
                    className='pl-10 pr-10'
                    placeholder='Create a password'
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
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
              <div className='space-y-2'>
                <Label htmlFor='signup-confirm-password'>
                  Confirm Password
                </Label>
                <Input
                  id='signup-confirm-password'
                  type='password'
                  placeholder='Confirm your password'
                  value={signupData.confirmPassword}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type='submit' className='w-full mt-5'>
                Create Account
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className='mt-6 text-center text-sm text-gray-500'>
          <p>
            Already have an account?{" "}
            <button
              type='button'
              className='font-medium text-primary hover:underline'
              onClick={() => null}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
