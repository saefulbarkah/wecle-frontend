'use client';

import api from '@/api';
import { loginType } from '@/schemas/login-schema';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

const login = async (data: loginType) => {
  return api.post('/auth/login', data);
};

const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: async (res: AxiosResponse<loginType>) => {
      window.location.href = '/';
    },
  });
};

export default useLogin;
