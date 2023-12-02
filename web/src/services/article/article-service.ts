import api from '@/api';
import { ApiResponse, ArticleType } from '@/types';

export async function findArticle(slug: string): Promise<ArticleType> {
  const response = await api.get<ApiResponse<ArticleType>>(
    `/article/find/${slug}`
  );
  return response.data.data;
}
