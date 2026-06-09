"use client";

import { useState } from "react";
import Link from "next/link";
import {Person,Lock,Eye,EyeSlash,ArrowRight,ShieldCheck,} from "@gravity-ui/icons";
import {Button,Description,FieldError,Form,Input,Label,TextField,} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/"

    const onSubmit = async (e) =>{

          e.preventDefault();
          const formData = new FormData(e.target);
          const user = Object.fromEntries(formData.entries());
          console.log(user,"user");
          const {data, error} = await authClient.signIn.email
          ({
              email: user.email,
              password: user.password,
          })
          console.log(data, error);
          if(data){
          toast.success("Login successful")
          router.push(redirectTo);  
          }
          if(error){
          toast.error("Login Unsuccessful")
          }
      }

  return (
    <div className="min-h-screen bg-black py-10 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-xl">

        {/* Top Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-600/20">
            <ShieldCheck className="h-6 w-6 text-blue-500" />
          </div>
        </div>

        {/* Heading */}
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Login to continue your journey
          </p>
        </div>

        <Form onSubmit={onSubmit} className="flex flex-col gap-5">

          {/* Email */}
          <TextField
            isRequired
            type="email"
            name="email"
            validate={(value) => {
              if (
                !value ||
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email";
              }

              return null;
            }}
          >
            <Label className="mb-2 text-sm text-zinc-300">
              Email Address
            </Label>

            <div className="relative">
              <Person className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-zinc-500" />

              <Input
                placeholder="Enter your email"
                className="rounded-xl w-full border border-zinc-700 bg-zinc-950 pl-12 text-white transition-all focus-within:border-blue-500"
              />
            </div>

            {/* <Description className="text-xs text-zinc-500">
              Enter your registered email
            </Description> */}

            <FieldError className="text-sm text-red-500" />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            type={showPassword ? "text" : "password"}
            name="password"
            validate={(value) => {
              if (!value || value.length < 6) {
                return "Password must be at least 6 characters";
              }

              return null;
            }}
          >
            <Label className="mb-2 text-sm text-zinc-300">
              Password
            </Label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-zinc-500" />

              <Input
                placeholder="Enter your password"
                className="rounded-xl w-full border border-zinc-700 bg-zinc-950 pl-12 pr-12 text-white transition-all focus-within:border-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-zinc-500 hover:text-white transition"
              >
                {showPassword ? (
                  <EyeSlash className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <FieldError className="text-sm text-red-500" />
          </TextField>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-blue-600 font-semibold text-white transition-all hover:bg-blue-700"
          >
            Login
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link href={`/signup?redirect=${redirectTo}`} className="cursor-pointer text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}