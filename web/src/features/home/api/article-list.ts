'use client';

import api from '@/api';
import { useSession } from '@/hooks/sessions/client';
import { ArticleType } from '@/types';
import { useQuery } from '@tanstack/react-query';

async function getArticle(token: string | undefined): Promise<ArticleType[]> {
  const response = await api.get('/article/lists', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
}

export const useListArticle = () => {
  const { data: user } = useSession();
  return useQuery({
    queryKey: ['list-article', user?.token],
    queryFn: () => getArticle(user?.token),
    enabled: user ? true : false,
  });
};
