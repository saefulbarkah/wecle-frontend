import { create } from 'zustand';

export type articleType = {
  _id?: string | null;
  content?: string | null;
  title?: string | null;
  author?: string | null;
  status?: 'DRAFT' | 'RELEASE';
};

type State = {
  article: articleType;
};

type Action = {
  setArticle: (article: articleType | null) => void;
};

export const useArticleState = create<State & Action>((set) => ({
  article: {
    _id: null,
    author: null,
    title: '',
    content: '',
    status: 'DRAFT',
  },

  setArticle: (data) =>
    set((state) => ({
      article: { ...state.article, ...data },
    })),
}));
