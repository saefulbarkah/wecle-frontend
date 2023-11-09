import Input from '@/components/form/Input';
import { Button } from '@/components/ui/button';
import SwitchMenuAuth from './switch-menu';

const LoginOverlay = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-10">Sign In</h2>
      <form action="" className="w-full sm:px-16">
        <div className="flex flex-col gap-10">
          <Input.Text placeholder="Email" type="email" />
          <Input.Password placeholder="Password" />
          <Button>Submit</Button>
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
