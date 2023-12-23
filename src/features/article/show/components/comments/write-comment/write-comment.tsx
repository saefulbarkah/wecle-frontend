'use client';

import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Link from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Placeholder from '@tiptap/extension-placeholder';
import './write-comment.css';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useCreateComment } from '@/features/article/api/create-new-comment';
import { ArticleType } from '@/types';
import { SessionType } from '@/hooks/sessions/type';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth, useAuthOverlay } from '@/features/auth/store';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { socket } from '@/socket/socket';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  comment: z.string({ required_error: 'Form is required' }),
});

type formSchema = z.infer<typeof formSchema>;

const WriteComment = ({ article }: { article: ArticleType }) => {
  const session = useAuth((state) => state.session);
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    setError,
  } = useForm<formSchema>({ resolver: zodResolver(formSchema) });

  const query = useQueryClient();

  const { mutateAsync, isPending } = useCreateComment({
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ['comment-article'] });
      if (socket?.connected) {
        socket.emit('send-notification', {
          sender: session?.id,
          receiver: article.author.user,
          message: `commented on your article`,
          targetUrl:
            process.env.NEXT_PUBLIC_BASE_URL + '/article/' + article.slug,
        });
      }
    },
  });

  const setOpenAuth = useAuthOverlay((state) => state.setOpen);

  const handleAddComment = async (data: formSchema) => {
    if (!session) {
      setOpenAuth(true);
      return;
    }
    if (data.comment.trim() === '') {
      return setError('comment', {
        type: 'required',
        message: '*Field must be not empty',
      });
    }

    await mutateAsync({
      articleId: article._id,
      userId: session?.id as string,
      text: data.comment,
      token: session?.token as string,
    });
    setValue('comment', '');
  };

  return (
    <>
      <div className="mt-8 relative">
        {session ? null : (
          <div
            className="absolute inset-0 bg-white/10 cursor-pointer w-full h-full z-50"
            onClick={() => {
              if (!session) {
                toast('You need login first');
                setOpenAuth(true);
                return;
              }
            }}
          />
        )}
        <div className="flex w-full gap-2">
          <Avatar>
            {session && (
              <Image fill src={session.avatar as string} alt="testing" />
            )}
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <form onSubmit={handleSubmit(handleAddComment)}>
              <textarea
                className={`w-full appearance-none border-none outline-none ring-1 ring-secondary rounded p-3 focus:ring-primary focus:ring-2 ${
                  errors.comment && 'ring-danger'
                }`}
                placeholder="Add your comment here"
                rows={2}
                {...register('comment', { required: true })}
              />
              {errors.comment && (
                <p className="text-md font-semibold text-danger">
                  {errors.comment.message}
                </p>
              )}
              <div className="mt-2">
                <Button
                  className="disabled:pointer-events-auto disabled:cursor-not-allowed"
                  isLoading={isPending}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteComment;
