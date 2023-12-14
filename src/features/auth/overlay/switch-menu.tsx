import { Button } from '@/components/ui/button';
import { useMenuAuth } from '../store';

const SwitchMenuAuth = () => {
  const menu = useMenuAuth((state) => state.menu);
  const setMenu = useMenuAuth((state) => state.setMenu);
  return (
    <Button
      variant={'link'}
      className="p-0 font-semibold"
      onClick={() => {
        if (menu === 'LOGIN') return setMenu('REGISTER');
        setMenu('LOGIN');
      }}
    >
      {menu === 'LOGIN' ? <span>Create new account</span> : <span>Login</span>}
    </Button>
  );
};

export default SwitchMenuAuth;
