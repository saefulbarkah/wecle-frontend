'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useLikeCommentMutation } from '@/features/article/api/like-comment';
import { useAuth } from '@/features/auth/store';
import { timeAgo } from '@/lib/time';
import { findCommentType } from '@/types';
import { Dot, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { LikeComment } from './like-comment';
import { useDislikeCommentMutation } from '@/features/article/api/dislike-comment';

const ListComment = ({ data }: { data?: findCommentType[] }) => {
  const auth = useAuth((state) => state.session);

  const { mutate: likeComment } = useLikeCommentMutation();
  const { mutate: dislikeComment } = useDislikeCommentMutation();
  const handleReplyComment = () => {
    console.log('reply');
  };

  const handleLikeComment = (id: string, likes: findCommentType['likes']) => {
    if (!auth) return;
    const isLiked = likes.some((item) => item._id === auth.id);
    if (!isLiked) {
      return likeComment({
        id: id,
        userId: auth.id,
        token: auth.token,
      });
    }
    return dislikeComment({
      id: id,
      userId: auth.id,
      token: auth.token,
    });
  };

  return (
    <div className="mt-10">
      {data?.map((item, i) => (
        <div key={i}>
          <div className="flex gap-2">
            <Avatar>
              <Image
                src={`${item.user.avatar}`}
                alt={'Testing'}
                width={40}
                height={40}
                unoptimized
              />
            </Avatar>
            <div className="w-full">
              <div className="outline outline-1 outline-secondary/50 rounded p-3.5 w-full">
                <div className="flex items-center">
                  <h4 className="font-semibold">{item.user.name}</h4>
                  <Dot className="text-secondary/50" />
                  <p className="text-sm">{timeAgo(item.updatedAt as Date)}</p>
                </div>
                <div className="mt-3">
                  <p className="font-serif">{item.text}</p>
                </div>
              </div>

              <LikeComment
                onClick={() => handleLikeComment(item._id, item.likes)}
                likes={item.likes}
                userId={auth?.id as string}
              />

              <Button
                variant={'ghost'}
                className="mt-2 mb-5 active:bg-secondary/10"
                onClick={() => handleReplyComment()}
              >
                <MessageCircle size={18} className="mr-1" />
                <span className="text-sm">Reply</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListComment;
