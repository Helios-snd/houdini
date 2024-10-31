"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDebounceValue, useDebounceCallback  } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/Schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { signInSchema } from "@/Schemas/signInSchema";
const page = () => {
  // const [username, setUsername] = useState("");
  // const [usernameMessage, setUsernameMessage] = useState("");
  // const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const debounced = useDebounceCallback(setUsername, 300);
  const { toast } = useToast();
  const router = useRouter();

  // zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });


  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result =  await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password
      })
      if(result?.error){
        if (result.error == 'credentialsSignin') {
          toast({
            title: "Login Failed",
            description: "Incorrect username or password",
            variant:"destructive"
          })
        }else{
          toast({
            title: "Error",
            description: result.error,
            variant:"destructive"
          })
        }
      }

        if (result?.url) {
          router.replace('/dashboard')
        }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-fullmax-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Houdini
          </h1>
          <p className="mb-4">Sign in to start your annonymous adventure</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        

            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="email/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" > 
              Sign in
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{" "}
             <Link href="/sign-in" className=" text-blue-500 hover:text-blue-800"> Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
