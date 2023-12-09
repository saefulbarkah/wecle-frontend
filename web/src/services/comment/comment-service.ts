import api from '@/api';
import { ApiResponse, findCommentType } from '@/types';
import { AxiosResponse } from 'axios';

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

export type createCommentType = {
  userId: string;
  articleId: string;
  text: string;
};

type createResponse = AxiosResponse<ApiResponse>;
export async function createNewCommentArticle({
  articleId,
  text,
  userId,
  token,
}: createCommentType & { token: string }): Promise<createResponse> {
  return api.post<any, createResponse, createCommentType>(
    '/comments',
    {
      articleId,
      text,
      userId,
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
}
