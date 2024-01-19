/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ArticleAuthor, LoadingArticle } from "@/components/Article";
import { articleServices } from "@/services/article";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

type homeProps = {
  authorId?: string;
};

export const HomeAuthor = ({ authorId }: homeProps) => {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["article", authorId],
    queryFn: () =>
      articleServices.lists({ status: "RELEASE", authorId: authorId }),
    enabled: authorId ? true : false,
    getNextPageParam: (page) => page.nextPage,
    initialPageParam: 1,
  });

  const { ref, entry } = useIntersection({
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  if (isLoading) return <LoadingArticle count={5} />;

  const _articles = data?.pages.flatMap((page) => page.results);

  return (
    <div className="mt-10">
      <ArticleAuthor data={_articles} />
      <div ref={ref}></div>
    </div>
  );
};
