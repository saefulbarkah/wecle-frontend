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
import { useAuthOverlay } from '@/features/auth/store';
import toast from 'react-hot-toast';
import Image from 'next/image';

const WriteComment = ({
  article,
  session,
}: {
  article: ArticleType;
  session: SessionType;
}) => {
  const [content, setContent] = useState<string>('');
  const editor = useEditor({
    extensions: [
      Text,
      Paragraph,
      Document,
      Link,
      Placeholder.configure({
        placeholder: 'Add to the discussion',
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'outline-none border-none ring-1 ring-secondary/80 focus:ring-primary focus:ring-2 rounded-md min-h-32  w-full p-3 prose prose-base overflow-y-auto max-h-44',
      },
    },
    onUpdate: ({ editor }) => {
      const htmlJSON = editor.getJSON();
      if (!htmlJSON) return;
      const value = htmlJSON.content?.[0].content?.[0].text || '';
      if (!value) return setContent('');
      setContent(editor.getText());
    },
    content: content,
  });

  const query = useQueryClient();

  const { mutateAsync, isPending } = useCreateComment({
    onSuccess: () => {
      editor?.commands.setContent('');
      query.invalidateQueries({ queryKey: ['comment-article'] });
    },
  });

  const setOpenAuth = useAuthOverlay((state) => state.setOpen);

  const handleAddComment = async () => {
    if (!session) {
      setOpenAuth(true);
      return;
    }
    await mutateAsync({
      articleId: article._id,
      userId: session?.id as string,
      text: content,
      token: session?.token as string,
    });
  };

  const isNoContent = content === '' ? true : false;

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
            <EditorContent editor={editor} />
            <div className="mt-2">
              <Button
                disabled={isNoContent || isPending}
                className="disabled:pointer-events-auto disabled:cursor-not-allowed"
                onClick={() => handleAddComment()}
                isLoading={isPending}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteComment;
