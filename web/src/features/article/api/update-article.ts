'use client';

import api from '@/api';
import { useAuth } from '@/features/auth/store';
import { articleType, useArticleState } from '@/stores/article-store';
import { ApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type post = Partial<Pick<articleType, 'content' | 'title'>> & {
  author: string;
  status?: 'RELEASE' | 'DRAFT';
};

type response = AxiosResponse<ApiResponse<Partial<post>>>;

type requestMutation = {
  data: post;
  id: string;
  token: string;
};

const post = ({ data, id, token }: requestMutation) => {
  return api.put<post, response, post>(
    `/article/update/${id}`,
    {
      content: data.content,
      title: data.title,
      author: data.author,
      status: data.status,
    },
    {
      headers: {
        Authorization: 'bearer ' + token,
      },
    }
  );
};

export const useUpdateArticle = () => {
  const resetArticle = useArticleState((state) => state.reset);
  const router = useRouter();

  return useMutation<response, AxiosError<ApiResponse>, requestMutation>({
    mutationKey: ['update-article'],
    mutationFn: ({ data, id, token }) => post({ data, id, token: token }),
    onSuccess: () => {
      toast.success('Your article has published');
      resetArticle();
      router.replace('/');
    },
    onError: (res) => {
      const data = res.response?.data;
      if (data?.status === 400) {
        return toast.error(data.message);
      }
    },
  });
};
