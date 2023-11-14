'use client';

import api from '@/api';
import { useQuery } from '@tanstack/react-query';
import { SessionType } from './type';

const getUser = async (): Promise<SessionType> => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: getUser,
  });
};
