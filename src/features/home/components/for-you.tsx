"use client";

import React from "react";
import { useListArticle } from "../api/article-list";
import Article from "../../../components/Article/article";
import { LoadingArticle } from "@/components/Article";

export const ForYou = () => {
  const { data, isLoading } = useListArticle();

  if (isLoading) return <LoadingArticle count={5} />;

  return (
    <>
      <Article data={data} />
    </>
  );
};
