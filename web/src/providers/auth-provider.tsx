'use client';

import { useAuth } from '@/features/auth/store';
import React, { useEffect } from 'react';

type authProps = React.PropsWithChildren & {
  token?: string | null;
};
function AuthProvider({ children, token = null }: authProps) {
  const setToken = useAuth((state) => state.setToken);

  useEffect(() => {
    setToken(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}

export default AuthProvider;
