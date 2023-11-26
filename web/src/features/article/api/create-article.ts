'use client';

import api from '@/api';
import { useAuth } from '@/features/auth/store';
import { ApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

type createArticle = {
  title: string;
  content: string;
  user_id: string;
};

type response = AxiosResponse<ApiResponse<createArticle>>;

export const useCreateArticle = () => {
  const token = useAuth((state) => state.token);

  const post = (data: createArticle) => {
    return api.post('/article/create', data, {
      headers: {
        Authorization: 'bearer ' + token,
      },
    });
  };

  return useMutation<response, AxiosError<ApiResponse>, createArticle>({
    mutationKey: ['create-article'],
    mutationFn: post,
    onSuccess: (res) => {
      toast.success(res.data.message);
    },
    onError: (res) => {
      const data = res.response?.data;
      if (data?.status === 400) {
        return toast.error(data.message);
      }
    },
  });
};
