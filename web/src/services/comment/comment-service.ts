import api from '@/api';
import { ApiResponse, findCommentType } from '@/types';

export const findCommentByArticleId = async ({
  articleId,
}: {
  articleId: string;
}): Promise<findCommentType[]> => {
  const response = await api.get<ApiResponse<findCommentType[]>>(
    `/comments/article/` + articleId
  );
  return response.data.data;
};
