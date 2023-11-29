'use client';

import api from '@/api';
import { useAuth } from '@/features/auth/store';
import { articleType } from '@/stores/article-store';
import { ApiResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

type response = AxiosResponse<ApiResponse<Partial<articleType>>>;

type request = {
  author_id?: string;
  id?: string;
};

const getDraft = async (data: request, token?: string) => {
  const response = await api.patch<response>(
    '/article/find/draft',
    {
      id: data.id,
      author_id: data.author_id,
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
  return response.data.data;
};

export const useFindDraft = ({ id }: { id: string | null }) => {
  const session = useAuth((state) => state.session);
  return useQuery<any, any, articleType>({
    enabled: id ? true : false,
    queryKey: ['find-draft', id],
    queryFn: () =>
      getDraft(
        { author_id: session?.author_id, id: id as string },
        session?.token as string
      ),
    retry: 0,
  });
};
