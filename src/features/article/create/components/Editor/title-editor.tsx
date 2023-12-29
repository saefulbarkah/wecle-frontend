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
import { articleType, useArticleState } from "@/stores/article-store";

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

export const TitleEditor = ({
  data,
  editable,
}: {
  data?: articleType;
  editable: boolean;
}) => {
  const editorState = useEditorStore((state) => state);
  const state = useTitleState((state) => state);
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
          "outline-none prose prose-sm sm:prose-base lg:prose-xl xl:prose-2xl m-5 focus:outline-none pt-[2.5rem]",
      },
    },
    autofocus: false,
    onUpdate: ({ editor }) => {
      const getJSON = editor.getJSON();
      if (!getJSON.content) return;
      const title = getJSON.content?.[0].content?.[0].text || "";
      const isEmpty = editor.isEmpty;
      if (isEmpty) {
        editorState.setStatus(null);
        state.setTitle("");
        articleState.setArticle({ title: "" });
        return;
      }
      state.setTitle(title);
      articleState.setArticle({ title: title });
      if (data?.content) {
        editorState.setStatus("writing");
      }
    },
    onFocus: () => {
      editorState.setFocus({ content: false, title: true });
    },
  });

  const rebindingTitle = () => {
    if (!data) return;
    editor?.commands.setContent(data.title as string);
    articleState.setArticle({ title: data.title });
  };

  useEffect(() => {
    rebindingTitle();
  }, [data]);

  useEffect(() => {
    editor?.setEditable(editable);
  }, [editable]);

  return <EditorContent editor={editor} />;
};
