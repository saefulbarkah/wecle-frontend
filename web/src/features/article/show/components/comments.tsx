'use client';
import { SessionType } from '@/hooks/sessions/type';
import React from 'react';
import WriteComment from './comments/write-comment/write-comment';
import ListComment from './comments/list-comment';
import { ArticleType } from '@/types';
import { useCommentListsArticle } from '../../api/get-comment';

export const Comments = ({
  session,
  article,
}: {
  session: SessionType;
  article: ArticleType;
}) => {
  const { data: comment } = useCommentListsArticle(article._id);

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold">Top Comments {comment?.length} </h2>
      <WriteComment />
      <ListComment data={comment} />
    </div>
  );
};
