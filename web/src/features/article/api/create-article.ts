'use client';

import api from '@/api';
import { useAuth } from '@/features/auth/store';
import { articleType } from '@/stores/article-store';
import { ApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

type post = Pick<articleType, 'content' | 'title'> & {
  author: string;
};

type response = AxiosResponse<ApiResponse<Partial<post>>>;

export const useCreateArticle = () => {
  const token = useAuth((state) => state.token);

  const post = (data: post) => {
    return api.post<post, response, post>(
      '/article/create',
      {
        content: data.content,
        title: data.title,
        author: data.author,
      },
      {
        headers: {
          Authorization: 'bearer ' + token,
        },
      }
    );
  };

  return useMutation<response, AxiosError<ApiResponse>, post>({
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
