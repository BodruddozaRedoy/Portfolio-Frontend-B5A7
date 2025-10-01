'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Lock, Mail, User, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import {signIn} from 'next-auth/react'
import { toast } from 'sonner'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleLogin =  async(e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn("credentials", {
      redirect: false,
      email: loginData.email,
      password: loginData.password,
      callbackUrl: "/"
    })

    if(res?.error){
      toast.error("Login failed!!")
    }

    if(res?.ok){
      toast.success("Logged in successfully!")
    }
    console.log('Login:', loginData)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Signup:', signupData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              DevRedoy
            </h1>
          </Link>
          <p className="text-gray-400 mt-2">
            Welcome back! Please sign in to continue.
          </p>
        </div>

        <Card className="backdrop-blur-lg bg-gray-900/80 shadow-2xl border border-gray-800 p-5 py-10">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-1 mb-6 bg-gray-800 text-gray-300">
              <TabsTrigger value="login">Login</TabsTrigger>
              {/* <TabsTrigger value="signup">Sign Up</TabsTrigger> */}
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl font-bold text-center text-white">
                  Sign In
                </CardTitle>
                <CardDescription className="text-center text-gray-400">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 h-12 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-12 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData((prev) => ({ ...prev, password: e.target.value }))
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 mt-5">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    Sign In
                  </Button>
                  {/* <p className="text-sm text-center text-gray-400">
                    Don&apos;t have an account?{' '}
                    <button type="button" className="text-indigo-400 hover:underline">
                      Sign up instead
                    </button>
                  </p> */}
                </CardFooter>
              </form>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl font-bold text-center text-white">
                  Create Account
                </CardTitle>
                <CardDescription className="text-center text-gray-400">
                  Join us and start your journey today
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10 h-12 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        value={signupData.name}
                        onChange={(e) =>
                          setSignupData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-300">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 h-12 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        value={signupData.email}
                        onChange={(e) =>
                          setSignupData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-12 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData((prev) => ({ ...prev, password: e.target.value }))
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 mt-5">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    Create Account
                  </Button>
                  <p className="text-sm text-center text-gray-400">
                    Already have an account?{' '}
                    <button type="button" className="text-indigo-400 hover:underline">
                      Sign in instead
                    </button>
                  </p>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
