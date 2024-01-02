/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Focus from "@tiptap/extension-focus";
import Placeholder from "@tiptap/extension-placeholder";
import HardBreak from "@tiptap/extension-hard-break";
import Dropcursor from "@tiptap/extension-dropcursor";
import Bold from "@tiptap/extension-bold";
import Image from "@tiptap/extension-image";
import History from "@tiptap/extension-history";
import Blockquote from "@tiptap/extension-blockquote";
import { useEditor, EditorContent } from "@tiptap/react";
import "./editor.css";
import { FloatingMenu } from "./menus/floating-menu";
import { useEffect } from "react";
import { useEditorStore } from "./store";
import { useArticleState } from "@/stores/article-store";
import { BubbleMenu } from "./menus/bubble-menu";
import { ArticleTypeResponse } from "@/types";

const ContentEditor = ({
  data,
  editable,
}: {
  data?: ArticleTypeResponse;
  editable: boolean;
}) => {
  const editorState = useEditorStore((state) => state);
  const articleState = useArticleState((state) => state);

  const editor = useEditor({
    extensions: [
      Document,
      Text,
      HardBreak,
      Dropcursor,
      Bold,
      History,
      Blockquote,
      Image.configure({
        allowBase64: true,
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "font-serif",
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "font-serif font-bold",
        },
        levels: [3],
      }),
      Focus.configure({
        mode: "all",
        className: "focus",
      }),
      Placeholder.configure({
        placeholder: "Can you add some further context?",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "outline-none prose prose-sm lg:prose-lg xl:prose-xl m-5 focus:outline-none mb-[5rem]",
      },
    },
    content: "",
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      const isEmpty = editor.isEmpty;
      if (isEmpty || content.trim() === "") {
        articleState.setArticle({ content: null });
      } else {
        articleState.setArticle({ content: content });
      }
    },
  });

  const bindingDraft = () => {
    if (!data) {
      editor?.commands.setContent(articleState.article.content as string);
      return;
    }
    editor?.commands.setContent(data.content as string);
    // articleState.setArticle(data);
  };

  useEffect(() => {
    if (editorState.focus?.content) {
      editor?.commands.focus();
    }
  }, [editorState.focus.content]);

  // binding draft
  useEffect(() => {
    bindingDraft();
  }, [data, editor]);

  useEffect(() => {
    editor?.setEditable(editable);
  }, [editable]);

  return (
    <>
      <BubbleMenu editor={editor} />
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor} />
    </>
  );
};

export default ContentEditor;
