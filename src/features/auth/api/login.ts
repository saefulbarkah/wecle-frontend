"use client";

import { loginType } from "@/schemas/login-schema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import nproggres from "nprogress";
import toast from "react-hot-toast";
import { ApiResponse } from "@/types";
import API from "@/api";
import { useAuth } from "@/stores/auth-store";

const login = async (data: loginType) => {
  return API.proxy.post("/auth/login", data);
};

const useLogin = () => {
  const setToken = useAuth((state) => state.setToken);
  const router = useRouter();

  return useMutation<
    AxiosResponse<ApiResponse<{ token: string }>>,
    AxiosError<ApiResponse>,
    loginType
  >({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: async (res) => {
      const response = res.data;
      nproggres.done();
      toast.success(response.message);
      setToken(response.data.token);
      const login = new BroadcastChannel("logout");
      login.postMessage({ action: "login" });
      router.replace("/");
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
      nproggres.done();
    },
  });
};

export default useLogin;
