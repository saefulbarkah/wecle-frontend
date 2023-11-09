import { Button } from '@/components/ui/button';
import { isUserHaveAccount } from '../store';
import { useAtom } from 'jotai';

const SwitchMenuAuth = () => {
  const [isMenuLogin, setMenuLogin] = useAtom(isUserHaveAccount);
  return (
    <Button
      variant={'link'}
      className="p-0 font-semibold"
      onClick={() => {
        if (isMenuLogin) return setMenuLogin(false);
        setMenuLogin(true);
      }}
    >
      {isMenuLogin ? <span>Create new account</span> : <span>Login</span>}
    </Button>
  );
};

export default SwitchMenuAuth;
