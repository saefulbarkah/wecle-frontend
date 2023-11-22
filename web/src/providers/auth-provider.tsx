'use client';

import { useAuth } from '@/features/auth/store';
import { SessionType } from '@/hooks/sessions/type';
import React, { useEffect } from 'react';

type authProps = React.PropsWithChildren & {
  session: SessionType;
};
function AuthProvider({ children, session = null }: authProps) {
  const setToken = useAuth((state) => state.setToken);
  const setSession = useAuth((state) => state.setSession);

  useEffect(() => {
    if (!session) return;
    setToken(session.token as string);
    setSession({
      id: session.id,
      avatar: session.avatar,
      email: session.email,
      name: session.name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}

export default AuthProvider;
