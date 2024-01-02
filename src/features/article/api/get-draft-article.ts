"use client";

import API from "@/api";
import { articleType } from "@/stores/article-store";
import { useAuth } from "@/stores/auth-store";
import { ApiResponse, ArticleTypeResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export type TarticleEditor = Pick<
  articleType,
  "_id" | "author" | "content" | "status" | "title"
> & {
  cover?: string;
};

type response = AxiosResponse<ApiResponse<TarticleEditor>>;

type request = {
  author_id?: string;
  id?: string;
};

const getDraft = async (data: request, token?: string) => {
  const response = await API.axios.patch<response>(
    "/article/find/draft",
    {
      id: data.id,
      author_id: data.author_id,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  );
  return response.data.data;
};

export const useFindDraft = ({ id }: { id: string | null }) => {
  const session = useAuth((state) => state.session);
  return useQuery<any, any, ArticleTypeResponse>({
    enabled: id ? true : false,
    queryKey: ["find-draft", id],
    queryFn: () =>
      getDraft(
        { author_id: session?.author_id, id: id as string },
        session?.token as string,
      ),
    retry: 0,
  });
};
