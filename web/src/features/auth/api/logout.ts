'use client';

import api from '@/api';
import { useMutation } from '@tanstack/react-query';

const logout = async () => {
  return api.post('/auth/logout');
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      window.location.reload();
    },
  });
};
