'use client';
import { SessionType } from '@/hooks/sessions/type';
import React, { useEffect } from 'react';
import WriteComment from './comments/write-comment/write-comment';
import ListComment from './comments/list-comment';
import { commentType } from '@/types';
import { generateCommentArticle } from '@/lib/faker';
import { useComment } from './comments/store/comment-store';

export const Comments = ({ session }: { session: SessionType }) => {
  const comment = useComment((state) => state);

  // generate random data
  useEffect(() => {
    const fakeComment: commentType[] = Array.from({ length: 5 }, () =>
      generateCommentArticle()
    );

    return () => {
      fakeComment.map((item) => comment.addComment({ ...item }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold">Top Comments (5)</h2>
      <WriteComment />
      <ListComment data={comment.comments} />
    </div>
  );
};
