import {
  createCommentType,
  createNewCommentArticle,
} from '@/services/comment/comment-service';
import { ApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

type options = {
  onSuccess: () => void;
};

export const useCreateComment = (options?: options) => {
  return useMutation<
    AxiosResponse<ApiResponse>,
    AxiosError<any>,
    createCommentType & { token: string }
  >({
    mutationKey: ['create-new-comment'],
    mutationFn: ({ articleId, text, userId, token }) =>
      createNewCommentArticle({ articleId, text, userId, token }),
    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
  });
};
