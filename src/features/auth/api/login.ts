"use client";

import { loginType } from "@/schemas/login-schema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import nproggres from "nprogress";
import toast from "react-hot-toast";
import { ApiResponse } from "@/types";
import API from "@/api";
import { useAuth } from "@/stores/auth-store";
import { useAuthOverlay } from "../store/auth-overlay-store";
import { useRegisterStore } from "../components/Register";
import { SessionType } from "@/hooks/sessions/type";

const login = async (data: loginType) => {
  return API.proxy.post("/auth/login", data);
};

const useLogin = () => {
  const setOpenAuth = useAuthOverlay((state) => state.setOpen);
  const auth = useAuth((state) => state);
  const registerState = useRegisterStore((state) => state);

  return useMutation<
    AxiosResponse<ApiResponse<NonNullable<SessionType>>>,
    AxiosError<ApiResponse>,
    loginType
  >({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: async (res) => {
      const response = res.data;
      toast.success(response.message);
      auth.setToken(response.data.token);
      auth.setSession(response.data);
      const login = new BroadcastChannel("logout");
      login.postMessage({ action: "login" });
      setOpenAuth(false);
      registerState.setForm({
        email: null,
      });
    },
    onMutate: () => {
      nproggres.start();
    },
    onError: (res) => {
      const statusCode = res.response?.status;
      const msg = res.response?.data.message as string;
      if (statusCode === 400 || statusCode === 404) {
        toast.error(msg);
      }
    },
    onSettled: () => {
      nproggres.done();
    },
  });
};

export default useLogin;
