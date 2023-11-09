import Input from '@/components/form/Input';
import { Button } from '@/components/ui/button';
import SwitchMenuAuth from './switch-menu';

const RegisterOverlay = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-10">Sign Up</h2>
      <form className="w-full sm:px-16">
        <div className="flex flex-col gap-10">
          <Input.Text placeholder="Name" type="email" />
          <Input.Text placeholder="Email" type="email" />
          <Input.Password placeholder="Password" />
          <Button>Submit</Button>
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
