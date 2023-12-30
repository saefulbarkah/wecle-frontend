"use client";

import { SessionType } from "@/hooks/sessions/type";
import { useAuth } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type authProps = React.PropsWithChildren & {
  session: SessionType;
};
function AuthProvider({ children, session = null }: authProps) {
  const setToken = useAuth((state) => state.setToken);
  const setSession = useAuth((state) => state.setSession);
  const router = useRouter();

  useEffect(() => {
    const bc = new BroadcastChannel("logout");
    bc.onmessage = (event) => {
      if (event.data.action === "logout") {
        setToken(null);
        setSession(null);
      }
      if (event.data.action === "login") {
        router.refresh();
      }
    };
    return () => {
      bc.close();
    };
  });

  useEffect(() => {
    if (!session) return;
    setToken(session.token as string);
    setSession({
      id: session.id,
      avatar: session.avatar,
      email: session.email,
      name: session.name,
      author_id: session.author_id,
      token: session.token,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return children;
}

export default AuthProvider;
