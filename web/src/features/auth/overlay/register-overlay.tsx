import Input from '@/components/form/Input';
import { Button } from '@/components/ui/button';
import SwitchMenuAuth from './switch-menu';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, registerType } from '@/schemas/register-schema';
import { useRegister } from '../api/register';

const RegisterOverlay = () => {
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
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-10">Sign Up</h2>
      <form className="w-full sm:px-16" onSubmit={handleSubmit(onRegister)}>
        <div className="flex flex-col gap-10">
          <Input.Text
            placeholder="Name"
            {...register('name')}
            error={errors.name}
          />
          <Input.Text
            placeholder="Email"
            {...register('email')}
            error={errors.email}
          />
          <Input.Password
            placeholder="Password"
            {...register('password')}
            error={errors.password}
          />
          <Button type="submit" isLoading={isPending}>
            Submit
          </Button>
        </div>
      </form>
      <p className="mt-2 text-sm">
        <span>Already have account ? </span>
        <SwitchMenuAuth />
      </p>
    </div>
  );
};
export default RegisterOverlay;
