"use client";
import Input from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginType } from "@/schemas/login-schema";
import useLogin from "../api/login";
import Link from "next/link";

export const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync: login, isPending } = useLogin();

  const onLogin = async (data: loginType) => {
    await login(data);
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center border px-10">
      <h2 className="mb-10 text-2xl font-semibold">Sign In</h2>
      <form
        className="w-full max-w-full sm:max-w-md sm:px-16 md:max-w-md lg:max-w-lg"
        onSubmit={handleSubmit(onLogin)}
      >
        <div className="flex flex-col gap-10">
          <Input.Text
            autoComplete="off"
            error={errors.email}
            placeholder="Email"
            {...register("email")}
          />
          <Input.Password
            placeholder="Password"
            error={errors.password}
            {...register("password")}
          />
          <Button type="submit" isLoading={isPending}>
            Submit
          </Button>
        </div>
      </form>
      <p className="mt-5 text-sm">
        <span>Dont have account ? </span>
        <Link
          href={"/auth/register"}
          className="font-semibold text-primary hover:underline"
        >
          Create new account
        </Link>
      </p>
    </div>
  );
};
