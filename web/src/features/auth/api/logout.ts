'use client';

import api from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import nproggres from 'nprogress';
import toast from 'react-hot-toast';

const logout = async () => {
  return api.post('/auth/logout');
};

export const useLogout = () => {
  const router = useRouter();
  const onLogout = 'onlogout';

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      nproggres.done();
      router.refresh();
      toast.success('logout success', { id: onLogout, duration: 1000 });
    },
    onMutate: () => {
      toast.loading('logout...', { id: onLogout });
      nproggres.start();
    },
  });
};
