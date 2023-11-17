'use client';

import React from 'react';
import { useListArticle } from '../api/article-list';
import Article from './article';

export const ForYou = () => {
  const { data } = useListArticle();
  return (
    <>
      <Article data={data} />
    </>
  );
};
