'use client';

import api from '@/api';
import { articleType, useArticleState } from '@/stores/article-store';
import { ApiResponse } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

type response = AxiosResponse<ApiResponse<Partial<articleType>>>;

type post = Pick<articleType, 'content' | 'title' | 'author'> & {
  id: string | null | undefined;
};

const saveToDraft = (data: Partial<articleType>, token: string) => {
  return api.post<any, response, post>(
    '/article/save/draft',
    {
      id: data._id,
      title: data.title,
      content: data.content,
      author: data.author,
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
};

const onLogout = 'onlogout';

export const useSaveDraft = () => {
  const query = useQueryClient();
  const article = useArticleState((state) => state);

  return useMutation<
    response,
    AxiosError<ApiResponse>,
    { data: Partial<articleType>; token: string }
  >({
    mutationKey: ['save-draft'],
    mutationFn: ({ data, token }) => saveToDraft(data, token),
    onSuccess: async (res) => {
      query.invalidateQueries({ queryKey: ['draft'] });
      const response = res.data;
      toast.success('Success saving to draft', {
        id: onLogout,
      });
      if (!response.data) return;
      const { _id, author, content, title } = response.data;
      const url = `?draftId=${_id}`;
      window.history.replaceState(
        {
          ...window.history.state,
          as: url,
          url: url,
        },
        '',
        url
      );
      article.setArticle({
        _id,
        author,
        content,
        title,
      });
    },
    onMutate: () => {
      toast.loading('Saving to draft....', { id: onLogout });
    },
  });
};
