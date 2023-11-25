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
import { nanoid } from 'nanoid';
import { useDraft } from '@/hooks';
import { useRouter, useSearchParams } from 'next/navigation';

const CustomDocument = Document.extend({
  content: 'heading block*',
});

const uuid = nanoid(5);

export const Editor = () => {
  const router = useRouter();
  const query = useSearchParams();
  const { create, findArticle, session, setArticle, data } = useDraft({
    onSuccessCreate: ({ id }) => {
      router.push('?draftId=' + id);
    },
  });

  const [contentJSON, setContentJSON] = useState<any>();
  const [content, setContent] = useState('');
  const [value] = useDebounce(content, 500);

  const editor = useEditor({
    extensions: [
      CustomDocument,
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
          'outline-none border-none prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none pt-[2.5rem] mb-[5rem]',
      },
    },
    autofocus: true,
    content: content,
    onUpdate: ({ editor }) => {
      setContentJSON(editor.getJSON());
      setContent(editor.getHTML());
    },
  });

  // rendered firs time
  useEffect(() => {
    const draftId = query.get('draftId');
    const article = findArticle(draftId);
    editor?.commands.setContent(article?.content as string);
    if (article) {
      return setArticle(article);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, editor]);

  // saving draft automatically
  useEffect(() => {
    const queryID = query.get('draftId');
    const find = findArticle(queryID);
    if (session) {
      const title = contentJSON.content[0].content[0].text;
      if (!find) {
        setArticle({
          title,
          id: uuid,
          content: value,
          user_id: session?.id,
        });
        return create({
          title,
          id: uuid,
          content: value,
          user_id: session?.id,
        });
      }
      create({
        title,
        id: queryID as string,
        content: value,
        user_id: session?.id,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

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
