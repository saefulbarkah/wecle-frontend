"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import nproggres from "nprogress";
import toast from "react-hot-toast";
import API from "@/api";
import { useAuth } from "@/stores/auth-store";

const logout = async () => {
  return API.proxy.post("/auth/logout");
};

export const useLogout = () => {
  const auth = useAuth((state) => state);
  const router = useRouter();
  const onLogout = "onlogout";

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      nproggres.done();
      toast.success("logout success", { id: onLogout, duration: 1000 });
      auth.setSession(null);
      auth.setToken(null);
      const logout = new BroadcastChannel("logout");
      logout.postMessage({ action: "logout" });
      router.refresh();
    },
    onMutate: () => {
      toast.loading("logout...", { id: onLogout });
      nproggres.start();
    },
  });
};
