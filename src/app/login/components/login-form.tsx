"use client";

import authApi from "@/apis/auth.api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { errorCss, successCss } from "@/components/ui/sonner";
import { useLocalStorage } from "@/hooks/local-storage-hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine((val) => /[a-z]/.test(val), "Must include a lowercase letter")
    .refine((val) => /[A-Z]/.test(val), "Must include an uppercase letter")
    .refine((val) => /[0-9]/.test(val), "Must include a number")
    .refine(
      (val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(val),
      "Must include a special character"
    ),
});

export default function LoginForm() {
  const [, setAccessToken] = useLocalStorage<string>(
    "access_token",
    ""
  );
  const [, setRefreshToken] = useLocalStorage<string>(
    "refresh_token",
    ""
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { email, password } = data;
    try {
      const response = await authApi.login({ email, password });
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      toast.success("Login successful", {
        style: successCss,
      });
    } catch (err: Error | any) {
      toast.error(err.message, {
        style: errorCss,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-fit flex flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 gap-3">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@tixflow.net"
                  {...field}
                  className="h-14 text-3xl px-4 py-7"
                />
              </FormControl>
              <FormMessage className="text-xl" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 gap-3">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  className="h-14 text-3xl px-4 py-7"
                  type="password"
                  placeholder="Enter your account password..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xl" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-14 text-3xl px-4 py-7 mt-5 bg-yellow-500 hover:bg-yellow-600 text-white font-bold"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
