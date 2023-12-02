'use client';
import api from '@/api';
import { useAuth } from '@/features/auth/store';
import { ApiResponse, ArticleType } from '@/types';
import { useQuery } from '@tanstack/react-query';

type response = ApiResponse<ArticleType[]>;

const getDraft = async (author_id: string, token: string) => {
  const response = await api.post<response>(
    '/article/lists/draft',
    {
      author_id: author_id,
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
  return response.data.data;
};

export const useDraftLists = () => {
  const session = useAuth((state) => state.session);
  return useQuery({
    enabled: session ? true : false,
    queryKey: ['draft'],
    queryFn: () =>
      getDraft(session?.author_id as string, session?.token as string),
  });
};
