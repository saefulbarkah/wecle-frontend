"use client";

import API from "@/api";
import { ApiResponse, ArticleType, TPagination } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

type pageParam = number;

type response = ApiResponse<TPagination<ArticleType[]>>;

async function getArticle(page: pageParam) {
  const response = await API.axios.get<response>(`/article/lists?page=${page}`);
  return response.data.data;
}

export const useListArticle = () => {
  return useInfiniteQuery({
    queryKey: ["article-lists"],
    queryFn: ({ pageParam = 1 }) => getArticle(pageParam),
    getNextPageParam: (data) => data.nextPage,
    initialPageParam: 1,
  });
};
