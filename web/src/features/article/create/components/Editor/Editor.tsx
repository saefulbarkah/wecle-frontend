'use client';

import Paragraph from '@tiptap/extension-paragraph';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Focus from '@tiptap/extension-focus';
import Placeholder from '@tiptap/extension-placeholder';
import HardBreak from '@tiptap/extension-hard-break';
import Dropcursor from '@tiptap/extension-dropcursor';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import { useEditorStore } from './store';
import './editor.css';
import { BoldIcon } from 'lucide-react';
import { FloatingMenu } from './menus/floating-menu';

const CustomDocument = Document.extend({
  content: 'heading block*',
});

export const Editor = () => {
  const content = useEditorStore((state) => state.content);
  const editor = useEditor({
    extensions: [
      CustomDocument,
      Text,
      HardBreak,
      Dropcursor,
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
          'outline-none border-none prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
    autofocus: true,
    content: content,
  });

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
