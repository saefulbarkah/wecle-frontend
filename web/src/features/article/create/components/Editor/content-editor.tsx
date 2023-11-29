/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Paragraph from '@tiptap/extension-paragraph';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Focus from '@tiptap/extension-focus';
import Placeholder from '@tiptap/extension-placeholder';
import HardBreak from '@tiptap/extension-hard-break';
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import './editor.css';
import { BoldIcon } from 'lucide-react';
import { FloatingMenu } from './menus/floating-menu';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useTitleState } from './title-editor';
import { useEditorStore } from './store';
import { useSaveDraft } from '@/features/article/api/save-to-draft-article';
import { useAuth } from '@/features/auth/store';
import { useSearchParams } from 'next/navigation';
import { articleType, useArticleState } from '@/stores/article-store';

export const ContentEditor = ({ data }: { data?: articleType | null }) => {
  const session = useAuth((state) => state.session);
  const editorState = useEditorStore((state) => state);
  const [content, setContent] = useState('');
  const [value] = useDebounce(content, 1000);
  const { mutate } = useSaveDraft();
  const titleState = useTitleState((state) => state.title);
  const [title] = useDebounce(titleState, 1000);
  const articleState = useArticleState((state) => state);

  const editor = useEditor({
    extensions: [
      Document,
      Text,
      HardBreak,
      Dropcursor,
      Image.configure({
        allowBase64: true,
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: 'font-serif text-xl',
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: 'font-serif',
        },
        levels: [3, 4],
      }),
      Focus.configure({
        mode: 'all',
        className: 'focus',
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'What’s the title?';
          }
          return 'Can you add some further context?';
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'outline-none border-none prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none mb-[5rem]',
      },
    },
    content: '',
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setContent(content);
      articleState.setArticle({ content: content });
    },
  });

  const saveToDraft = async () => {
    if (!session) return;

    // validate title
    if (
      articleState.article?.title?.trim() === '' ||
      !articleState.article?.title
    )
      return;

    mutate({
      data: {
        _id: data?._id,
        title: articleState.article.title,
        content: articleState.article.content,
        author: session.author_id,
      },
      token: session.token as string,
    });
  };

  const bindingDraft = () => {
    if (!data) return;
    editor?.commands.setContent(data.content as string);
    articleState.setArticle(data);
  };

  useEffect(() => {
    if (editorState.focus.content) {
      editor?.commands.focus();
    }
  }, [editorState.focus.content]);

  useEffect(() => {
    saveToDraft();
  }, [value, title]);

  // binding draft
  useEffect(() => {
    bindingDraft();
  }, [data]);

  return (
    <>
      {editor && (
        <>
          <BubbleMenu editor={editor} tippyOptions={{ duration: 50 }}>
            <div className="bg-black rounded-md p-2">
              <button className="text-white">
                <BoldIcon />
              </button>
            </div>
          </BubbleMenu>
        </>
      )}

      <EditorContent editor={editor} />
      <FloatingMenu editor={editor} />
    </>
  );
};
