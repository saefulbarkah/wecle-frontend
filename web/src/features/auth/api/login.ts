'use client';

import api from '@/api';
import { loginType } from '@/schemas/login-schema';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import nproggres from 'nprogress';
import { useAuthOverlay } from '../store';
import toast from 'react-hot-toast';
import { ApiResponse } from '@/types';

const login = async (data: loginType) => {
  return api.post('/auth/login', data);
};

const useLogin = () => {
  const router = useRouter();
  const setOverlayAuth = useAuthOverlay((state) => state.setOpen);

  return useMutation<
    AxiosResponse<ApiResponse<{ token: string }>>,
    AxiosError<ApiResponse>,
    loginType
  >({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: async (res) => {
      const data = res.data.data;
      nproggres.done();
      setOverlayAuth(false);
      toast.success('Login sucesss');
      router.refresh();
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
