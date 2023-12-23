"use client";

import { ArticleAuthor, LoadingArticle } from "@/components/Article";
import { articleServices } from "@/services/article";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type homeProps = {
  authorId?: string;
};

export const HomeAuthor = ({ authorId }: homeProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["article", authorId],
    queryFn: () =>
      articleServices.lists({ status: "RELEASE", authorId: authorId }),
    enabled: authorId ? true : false,
  });

  if (isLoading) return <LoadingArticle count={5} />;

  return (
    <div className="mt-10">
      <ArticleAuthor data={data} />;
    </div>
  );
};
