"use client";
import Input from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerType } from "@/schemas/register-schema";
import { useRegister } from "../api/register";
import Link from "next/link";

export const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<registerType>({ resolver: zodResolver(registerSchema) });
  const { mutateAsync: createNewAccount, isPending } = useRegister();

  const onRegister = async (data: registerType) => {
    await createNewAccount(data);
    reset();
  };
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <h2 className="mb-10 text-2xl font-semibold">Sign Up</h2>
      <form
        className="w-full max-w-full sm:max-w-md sm:px-16 md:max-w-md lg:max-w-lg"
        onSubmit={handleSubmit(onRegister)}
      >
        <div className="flex flex-col gap-10">
          <Input.Text
            placeholder="Name"
            {...register("name")}
            error={errors.name}
          />
          <Input.Text
            placeholder="Email"
            {...register("email")}
            error={errors.email}
          />
          <Input.Password
            placeholder="Password"
            {...register("password")}
            error={errors.password}
          />
          <Button type="submit" isLoading={isPending}>
            Submit
          </Button>
        </div>
      </form>
      <p className="mt-2 text-sm">
        <span>Already have account ? </span>
        <Link
          href={"/auth/login"}
          className="font-semibold text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};
