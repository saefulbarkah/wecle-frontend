'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { findCommentType } from '@/types';
import { Heart } from 'lucide-react';

type likeType = ButtonProps & {
  likes: findCommentType['likes'];
  userId: string;
};

export const LikeComment = ({ likes, userId, ...props }: likeType) => {
  const isActive = likes.some((item) => item._id === userId);
  return (
    <Button
      variant={'ghost'}
      className={cn(`mt-2 mb-5 active:bg-secondary/10`)}
      {...props}
    >
      <Heart size={18} className="mr-2" fill={isActive ? 'red' : 'none'} />
      <span className="text-sm mr-1">{likes.length}</span>
      <span className="text-sm">Likes</span>
    </Button>
  );
};
