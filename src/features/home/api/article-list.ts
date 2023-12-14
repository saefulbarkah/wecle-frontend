'use client';

import api from '@/api';
import { ArticleType } from '@/types';
import { useQuery } from '@tanstack/react-query';

async function getArticle(): Promise<ArticleType[]> {
  const response = await api.get('/article/lists');
  return response.data.data;
}

export const useListArticle = () => {
  return useQuery({
    queryKey: ['list-article'],
    queryFn: getArticle,
  });
};
