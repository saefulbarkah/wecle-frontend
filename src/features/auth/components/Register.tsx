"use client";
import Input from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerType } from "@/schemas/register-schema";
import { useRegister } from "../api/register";
import SwitchMenu from "./switch-menu";
import { create } from "zustand";

type State = {
  form: {
    email: string | null;
  };
};
type Action = {
  setForm: (val: State["form"]) => void;
};

export const useRegisterStore = create<State & Action>((set) => ({
  form: {
    email: null,
  },
  setForm: (val) =>
    set({
      form: {
        email: val.email,
      },
    }),
}));

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
    <div>
      <h2 className="mb-10 text-center text-2xl font-semibold">Sign Up</h2>
      <form onSubmit={handleSubmit(onRegister)}>
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
            Register
          </Button>
        </div>
      </form>
      <div className="mt-5 flex items-center text-sm">
        <p>Already have account ? </p>
        <SwitchMenu switchTo="LOGIN" className="ml-1">
          Sign in
        </SwitchMenu>
      </div>
    </div>
  );
};
