"use client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Radio, RadioGroup } from "@heroui/react";
import {
  Person,
  Envelope,
  Lock,
  ShieldCheck,
  ArrowRight,
} from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";

export default function SignUpForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("seeker");
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/"

  const onSubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());
    console.log(user, "user");
    const plan = role === 'seeker' ? "seeker_free" : "recruiter-free"
    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
      role: user.role,
      plan,
    });
    console.log(data, error);
    if (data) {
      toast.success("Signup successful");
      router.push(redirectTo);  
    }
    if (error) {
      toast.error("Signup Unsuccessful");
    }
  };
  return (
    <div className="min-h-screen py-10 bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-xl">
        {/* Top Icon */}
        <div className="mb-3 flex justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/20">
            <ShieldCheck className="h-6 w-6 text-blue-500" />
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Create Account</h1>

          <p className="mt-2 text-sm text-zinc-400">
            Join us and start your journey today
          </p>
        </div>

        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Full Name */}
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.trim().length < 3) {
                return "Name must be at least 3 characters";
              }

              return null;
            }}
          >
            <Label className="mb-2 text-sm  text-zinc-300">Full Name</Label>

            <div className="relative">
              <Person className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />

              <Input
                placeholder="Enter your name"
                className="pl-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 text-white focus-within:border-blue-500 transition-all"
              />
            </div>

            {/* <Description className="text-xs text-zinc-500">
              Enter your full name
            </Description> */}

            <FieldError className="text-sm text-red-500" />
          </TextField>

          {/* photo url */}
          <TextField
            isRequired
            type="url"
            name="image"
          >
            <Label className="mb-2 text-sm  text-zinc-300">Photo url</Label>

            <div className="relative">
              <Person className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />

              <Input
                placeholder="Enter image url"
                className="pl-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 text-white focus-within:border-blue-500 transition-all"
              />
            </div>

            <FieldError className="text-sm text-red-500" />
          </TextField>

          

          {/* role selection */}
          <div className="flex flex-col gap-4">
            <Label>Subscription plan</Label>
            <RadioGroup
              defaultValue="seeker"
              name="role"
              onChange={(value)=> setRole(value)}
              orientation="horizontal"
            >
              <Radio  value="seeker">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Job seeker</Label>
                </Radio.Content>
              </Radio>
              <Radio value="recruiter">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Recruiter</Label>
                </Radio.Content>
              </Radio>
              
            </RadioGroup>
          </div>
          {/* Email */}
          <TextField
            isRequired
            type="email"
            name="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label className="mb-2 text-sm text-zinc-300">Email Address</Label>

            <div className="relative">
              <Envelope className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />

              <Input
                placeholder="Enter yout email"
                className="pl-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 text-white focus-within:border-blue-500 transition-all"
              />
            </div>

            {/* <Description className="text-xs text-zinc-500">
              We`ll never share your email
            </Description> */}

            <FieldError className="text-sm text-red-500" />
          </TextField>

          {/* Password */}
          <div className="relative">
            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              isRequired
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label className="text-zinc-400 text-xs font-semibold uppercase tracking-widest">
                Password
              </Label>
              <Input
                placeholder="Enter your password"
                className="rounded-lg bg-zinc-900 border border-zinc-700 text-white pr-10"
              />
              {/* <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description> */}
              <FieldError />
            </TextField>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>

          {/* Confirm Password */}
          <TextField
            isRequired
            type="password"
            name="confirmPassword"
            validate={(value) => {
              if (!value || value.length < 8) {
                return "Password must be at least 8 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Must contain at least 1 uppercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Must contain at least 1 number";
              }

              return null;
            }}
          >
            <Label className="mb-2 text-sm text-zinc-300">
              Confirm Password
            </Label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />

              <Input
                placeholder="Confirm your password"
                className="pl-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 text-white focus-within:border-blue-500 transition-all"
              />
            </div>

            <FieldError className="text-sm text-red-500" />
          </TextField>

          {/* Submit Button */}
          <Button
            type="submit"
            className="mt-2 h-12 w-full rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all"
          >
            Create Account
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            href={`/signin?redirect=${redirectTo}`}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
