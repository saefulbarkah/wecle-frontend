import { create } from "zustand";

export type articleType = {
  _id?: string | null;
  content?: string | null;
  title?: string | null;
  author?: string | null;
  status?: "DRAFT" | "RELEASE";
  cover?: {
    name: string | null;
    src: string | null;
    type?: "BASE64" | "URL" | null;
  } | null;
};

type State = {
  article: articleType;
  draftId?: string | null;
};

type Action = {
  setArticle: (article: articleType | null) => void;
  reset: () => void;
  setDraftId: (val: string) => void;
};

export const useArticleState = create<State & Action>((set) => ({
  article: {
    _id: null,
    author: null,
    title: null,
    content: null,
    cover: {
      name: null,
      type: null,
      src: null,
    },
    status: "DRAFT",
  },
  draftId: null,

  setArticle: (data) =>
    set((state) => ({
      article: { ...state.article, ...data },
    })),
  setDraftId: (val) => set({ draftId: val }),
  reset: () =>
    set({
      article: {
        _id: null,
        author: null,
        title: null,
        content: null,
        cover: {
          name: null,
          type: null,
          src: null,
        },
        status: "DRAFT",
      },
    }),
}));
