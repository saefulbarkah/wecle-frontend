"use client";

import { articleType, useArticleState } from "@/stores/article-store";
import { ApiResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import API from "@/api";
import toast from "react-hot-toast";
import { TArticleRequestCreate } from "@/services/article";

type response = AxiosResponse<ApiResponse<Partial<articleType>>>;

type post = Pick<articleType, "content" | "title" | "author" | "cover"> & {
  id?: string | undefined | null;
};

const saveToDraft = (data: post, token: string) => {
  return API.axios.post<any, response, post>(
    "/article/save/draft",
    {
      id: data.id,
      title: data.title,
      content: data.content,
      author: data.author,
      cover: data.cover,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  );
};

type Toptions = {
  onSuccess?: (res: response) => void;
  onMutate?: () => void;
};

export const useSaveDraft = (options?: Toptions) => {
  const query = useQueryClient();
  const article = useArticleState((state) => state);

  return useMutation<
    response,
    AxiosError<ApiResponse>,
    { data: TArticleRequestCreate; token: string }
  >({
    mutationKey: ["save-draft"],
    mutationFn: ({ data, token }) => saveToDraft(data, token),
    onSuccess: async (res, data) => {
      await query.invalidateQueries({ queryKey: ["draft"] });
      if (options?.onSuccess) {
        options.onSuccess(res);
      }
      const response = res.data;
      if (!response.data) return;
      const { _id, author, content, title, cover } = response.data;
      const url = `?draftId=${_id}`;
      window.history.replaceState(
        {
          ...window.history.state,
          as: url,
          url: url,
        },
        "",
        url,
      );
      article.setArticle({
        _id,
        author,
        content,
        title,
        cover,
      });
    },
    onError: (res) => {
      const response = res.response?.data;
      return toast.error(response?.message as string);
    },
    onMutate: () => {
      if (options?.onMutate) {
        options.onMutate();
      }
    },
  });
};
