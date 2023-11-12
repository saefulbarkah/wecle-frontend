'use client';

import api from '@/api';
import { loginType } from '@/schemas/login-schema';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import nproggres from 'nprogress';
import { useAuthOverlay } from '../store';

const login = async (data: loginType) => {
  return api.post('/auth/login', data);
};

const useLogin = () => {
  const router = useRouter();
  const setOverlayAuth = useAuthOverlay((state) => state.setOpen);

  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: async (res: AxiosResponse<loginType>) => {
      nproggres.done();
      router.refresh();
      setOverlayAuth(false);
    },
    onMutate: () => {
      nproggres.start();
    },
  });
};

export default useLogin;
