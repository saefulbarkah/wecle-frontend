/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef } from "react";
import { useListArticle } from "../api/article-list";
import Article from "../../../components/Article/article";
import { LoadingArticle } from "@/components/Article";
import { useIntersection } from "@mantine/hooks";

export const ForYou = () => {
  const { data, isLoading, fetchNextPage, isFetching } = useListArticle();
  const containerRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  useEffect(() => {
    console.log(data);
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  if (isLoading) return <LoadingArticle count={5} />;
  const _articles = data?.pages.flatMap((page) => page.results);

  return (
    <>
      {_articles?.length === 0 ? (
        <div className="">
          <p>No Articles</p>
        </div>
      ) : (
        <div className="h-full w-full">
          <Article data={_articles} />
          <div ref={ref}></div>
          {isFetching && <LoadingArticle count={3} />}
        </div>
      )}
    </>
  );
};
