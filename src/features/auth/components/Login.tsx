"use client";
import Input from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginType } from "@/schemas/login-schema";
import useLogin from "../api/login";
import SwitchMenu from "./switch-menu";
import { useRegisterStore } from "./Register";

const Login = () => {
  const registerState = useRegisterStore((state) => state);
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
    <div>
      <h2 className="mb-10 text-center text-2xl font-semibold">Sign In</h2>
      <form onSubmit={handleSubmit(onLogin)}>
        <div className="flex flex-col gap-10">
          <Input.Text
            error={errors.email}
            placeholder="Email"
            defaultValue={registerState.form.email || ""}
            {...register("email")}
          />
          <Input.Password
            placeholder="Password"
            error={errors.password}
            {...register("password")}
          />
          <Button type="submit" isLoading={isPending}>
            Login
          </Button>
        </div>
      </form>
      <div className="mt-5 flex items-center text-sm">
        <p>Dont have account ? </p>
        <SwitchMenu switchTo="REGISTER" className="ml-1">
          Create new account
        </SwitchMenu>
      </div>
    </div>
  );
};

export default Login;
