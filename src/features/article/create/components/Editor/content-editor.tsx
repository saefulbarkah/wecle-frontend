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
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useTitleState } from "./title-editor";
import { useEditorStore } from "./store";
import { useSaveDraft } from "@/features/article/api/save-to-draft-article";
import { articleType, useArticleState } from "@/stores/article-store";
import { BubbleMenu } from "./menus/bubble-menu";
import { useAuth } from "@/stores/auth-store";

export const ContentEditor = ({
  data,
  editable,
}: {
  data?: articleType | null;
  editable: boolean;
}) => {
  const session = useAuth((state) => state.session);
  const editorState = useEditorStore((state) => state);
  const [content, setContent] = useState("");
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
      if (isEmpty) {
        setContent("");
        articleState.setArticle({ content: "" });
        editorState.setStatus(null);
        return;
      }
      setContent(content);
      articleState.setArticle({ content: content });

      if (title.trim() !== "") {
        console.log("writting");
        editorState.setStatus("writing");
      }
    },
  });

  const saveToDraft = async () => {
    if (!session) return;
    let id = null;
    if (data) {
      id = data._id;
    }
    if (articleState.article) {
      id = articleState.article._id;
    }

    // validate title
    if (!articleState.article?.title || !articleState.article.content) return;
    if (articleState.article?.title?.trim() === "") {
      return console.log("make sure your title not empty for saved to draft");
    }

    mutate({
      data: {
        _id: id,
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
    if (editorState.focus?.content) {
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
