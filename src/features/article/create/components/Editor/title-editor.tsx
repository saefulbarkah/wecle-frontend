/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import { EditorContent, Extension, useEditor } from "@tiptap/react";
import React, { useEffect } from "react";
import { useEditorStore } from "./store";
import { create } from "zustand";
import { useArticleState } from "@/stores/article-store";
import { ArticleTypeResponse } from "@/types";

type State = {
  title: string;
};
type Action = {
  setTitle: (value: string) => void;
};

export const useTitleState = create<State & Action>((set) => ({
  title: "",
  setTitle: (val) => set({ title: val }),
}));

const OnlyHeadingDocument = Document.extend({
  content: "heading block*",
});

const TitleEditor = ({
  data,
  editable,
}: {
  data?: ArticleTypeResponse;
  editable: boolean;
}) => {
  const editorState = useEditorStore((state) => state);
  const articleState = useArticleState((state) => state);

  const disableEnter = Extension.create({
    addKeyboardShortcuts() {
      return {
        Enter: () => {
          editorState.setFocus({ title: false, content: true });
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    extensions: [
      OnlyHeadingDocument,
      disableEnter,
      Text,
      Heading.configure({
        HTMLAttributes: {
          class: "font-serif",
        },
        levels: [2],
      }),
      Placeholder.configure({
        placeholder: "Write title here",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "outline-none prose prose-sm sm:prose-base lg:prose-xl xl:prose-2xl m-5 focus:outline-none pt-[2.5rem] dark:prose-invert dark:border-b dark:border-white/10 pb-2 max-w-full",
      },
    },
    autofocus: false,
    onUpdate: ({ editor }) => {
      const getJSON = editor.getJSON();
      if (!getJSON.content) return;
      const title = getJSON.content?.[0].content?.[0].text || null || "";
      const isEmpty = editor.isEmpty;
      if (isEmpty || title.trim() === "") {
        articleState.setArticle({ title: null });
      } else {
        articleState.setArticle({ title: title });
      }
    },
    onFocus: () => {
      editorState.setFocus({ content: false, title: true });
    },
  });

  useEffect(() => {
    const bindTitle = () => {
      if (!data) {
        return editor?.commands.setContent(
          articleState.article.title as string,
        );
      }
      editor?.commands.setContent(data.title as string);
    };

    bindTitle();
  }, [data, editor]);

  useEffect(() => {
    editor?.setEditable(editable);
  }, [editable]);

  return <EditorContent editor={editor} />;
};

export default TitleEditor;
