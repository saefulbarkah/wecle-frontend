import { registerType } from "@/schemas/register-schema";
import { ApiResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useMenuAuth } from "../store";
import API from "@/api";

export const useRegister = () => {
  const setAuthMenu = useMenuAuth((state) => state.setMenu);
  return useMutation<
    AxiosResponse<ApiResponse>,
    AxiosError<ApiResponse>,
    registerType
  >({
    mutationKey: ["register"],
    mutationFn: (data) => API.proxy.post("/auth/register", data),
    onSuccess: (res) => {
      toast.success(res.data.message);
      setAuthMenu("LOGIN");
      setTimeout(() => {
        toast("Now you can login");
      }, 500);
    },
    onError: (res) => {
      if (res.response?.data.status === 400) {
        toast.error(res.response.data.message!);
      }
    },
  });
};
