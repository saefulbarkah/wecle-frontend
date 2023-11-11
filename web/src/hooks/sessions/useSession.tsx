'use client';

import api from '@/api';
import { useQuery } from '@tanstack/react-query';
import { User } from './session';

const getUser = async (): Promise<User> => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: getUser,
  });
};
