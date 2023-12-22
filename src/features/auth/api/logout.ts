'use client';

import api from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import nproggres from 'nprogress';
import toast from 'react-hot-toast';
import { useAuth } from '../store';

const logout = async () => {
  return api.post('/auth/logout');
};

export const useLogout = () => {
  const auth = useAuth((state) => state);
  const router = useRouter();
  const onLogout = 'onlogout';

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      nproggres.done();
      router.refresh();
      toast.success('logout success', { id: onLogout, duration: 1000 });
      auth.setSession(null);
      auth.setToken(null);
    },
    onMutate: () => {
      toast.loading('logout...', { id: onLogout });
      nproggres.start();
    },
  });
};
