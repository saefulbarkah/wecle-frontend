"use client";

import API from "@/api";
import { ApiResponse, ArticleType } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

type pageParam = number;

async function getArticle(page: pageParam) {
  const response = await API.axios.get<ApiResponse<ArticleType[]>>(
    `/article/lists?page=${page}`,
  );
  return response.data.data;
}

export const useListArticle = () => {
  return useInfiniteQuery({
    queryKey: ["article-lists"],
    queryFn: ({ pageParam = 1 }) => getArticle(pageParam),
    getNextPageParam: (data, pages) => {
      return data.length === 0 ? null : pages.length + 1;
    },
    initialPageParam: 1,
  });
};
