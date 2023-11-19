'use client';

import React from 'react';
import { useListArticle } from '../api/article-list';
import Article from './article';
import { LoadingArticle } from './loading-article';

export const ForYou = () => {
  const { data, isLoading } = useListArticle();

  if (isLoading) return <LoadingArticle count={5} />;

  return (
    <>
      <Article data={data} />
    </>
  );
};
