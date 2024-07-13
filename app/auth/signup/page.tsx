"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const formSchema = z.object({
  username: z.string().min(5, 'Username should be at least 5 characters long').max(15, 'Username should be less than 15 characters long'),
  email: z.string().email('Invalid email address'),
  nameFull: z.string().regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, 'Please enter your full name'),
  password: z.string().min(8, 'Password should be at least 8 characters long').max(20, 'Password should be less than 20 characters long').regex(/\d/, 'Password must contain at least one number'),
  confirmPassword: z.string().min(8, 'Password should be at least 8 characters long').max(20, 'Password should be less than 20 characters long').regex(/\d/, 'Password must contain at least one number'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export default function SignupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      nameFull: "",
      password: "",
      confirmPassword: "",
    },
  });
  const handleSubmit = async (values:z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/auth/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        alert('Signup successful!');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };
  
    return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nameFull"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email address"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <p className="mt-4 text-center">
            Already have an account? <Link href="/auth/login" className="text-blue-500">Log In</Link>
          </p>
        </form>
      </Form>
    </main>
  );
}

