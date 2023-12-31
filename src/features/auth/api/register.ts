import { registerType } from "@/schemas/register-schema";
import { ApiResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import API from "@/api";
import { useRegisterStore } from "../components/Register";
import { useAuthOverlay } from "../store/auth-overlay-store";

export const useRegister = () => {
  const register = useRegisterStore((state) => state.setForm);
  const overlay = useAuthOverlay((state) => state);
  return useMutation<
    AxiosResponse<ApiResponse>,
    AxiosError<ApiResponse>,
    registerType
  >({
    mutationKey: ["register"],
    mutationFn: (data) => API.proxy.post("/auth/register", data),
    onSuccess: (res, data) => {
      register({ email: data.email });
      toast.success(res.data.message);
      overlay.setMenu("LOGIN");
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
