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
import { useComment } from '../store/comment-store';
import { generateCommentArticle } from '@/lib/faker';
import { commentType } from '@/types';

const WriteComment = () => {
  const [content, setContent] = useState<string>('');
  const comment = useComment((state) => state);
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

  const handleAddComment = () => {
    const data: commentType = {
      ...generateCommentArticle(),
      text: content,
    };
    comment.addComment(data);
    editor?.commands.setContent('');
    setContent('');
  };

  return (
    <>
      <div className="mt-8">
        <div className="flex w-full gap-2">
          <Avatar>
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <EditorContent editor={editor} />
            <div className="mt-2">
              <Button
                disabled={content === '' ? true : false}
                className="disabled:pointer-events-auto disabled:cursor-not-allowed"
                onClick={() => handleAddComment()}
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
