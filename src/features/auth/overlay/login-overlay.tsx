import Input from '@/components/form/Input';
import { Button } from '@/components/ui/button';
import SwitchMenuAuth from './switch-menu';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, loginType } from '@/schemas/login-schema';
import useLogin from '../api/login';

const LoginOverlay = () => {
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
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-10">Sign In</h2>
      <form
        action=""
        className="w-full sm:px-16"
        onSubmit={handleSubmit(onLogin)}
      >
        <div className="flex flex-col gap-10">
          <Input.Text
            error={errors.email}
            placeholder="Email"
            {...register('email')}
          />
          <Input.Password
            placeholder="Password"
            error={errors.password}
            {...register('password')}
          />
          <Button type="submit" isLoading={isPending}>
            Submit
          </Button>
        </div>
      </form>
      <p className="mt-2 text-sm">
        <span>Dont have account ? </span>
        <SwitchMenuAuth />
      </p>
    </div>
  );
};

export default LoginOverlay;
