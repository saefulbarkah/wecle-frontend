"use client";
import API from "@/api";
import { useAuth } from "@/stores/auth-store";
import { ApiResponse, ArticleType } from "@/types";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type response = ApiResponse<ArticleType[]>;

const getDraft = async (author_id: string, token: string) => {
  const response = await API.axios.post<response>(
    "/article/lists/draft",
    {
      author_id: author_id,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  );
  return response.data.data;
};

type TProps = {
  enabled?: UseQueryOptions["enabled"];
};

export const useDraftLists = ({ enabled = false }: TProps = {}) => {
  const session = useAuth((state) => state.session);
  return useQuery({
    enabled: enabled,
    queryKey: ["draft"],
    queryFn: () =>
      getDraft(session?.author_id as string, session?.token as string),
  });
};
