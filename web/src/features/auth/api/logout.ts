'use client';

import api from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import nproggres from 'nprogress';

const logout = async () => {
  return api.post('/auth/logout');
};

export const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      nproggres.done();
      router.refresh();
    },
    onMutate: () => {
      nproggres.start();
    },
  });
};
