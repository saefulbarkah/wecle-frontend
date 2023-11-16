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
    AxiosResponse<ApiResponse<loginType>>,
    AxiosError<ApiResponse>,
    loginType
  >({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: async (res) => {
      nproggres.done();
      setOverlayAuth(false);
      toast.success('Login sucesss');
      router.refresh();
    },
    onMutate: () => {
      nproggres.start();
    },
    onError: (res) => {
      if (res.response?.status === 400) {
        toast.error(res.response.data.message);
      }
      nproggres.done();
    },
  });
};

export default useLogin;
