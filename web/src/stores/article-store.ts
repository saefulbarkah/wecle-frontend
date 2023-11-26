import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type article = {
  id: string;
  content: string;
  title: string;
  user_id?: string;
  status?: 'draft';
};

type State = {
  draft: article[];
  article: article | null;
};

type Action = {
  createArticle: (article: article) => void;
  setArticle: (article: article | null) => void;
};

export const useArticleState = create<State & Action>()(
  persist(
    (set, get) => ({
      draft: [],
      article: null,
      createArticle: (value) => {
        const article = get().draft;
        const isExistsAricleID = article.some((item) => item.id === value.id);

        if (isExistsAricleID) {
          return set((state) => ({
            draft: state.draft.map((item) =>
              item.id === value.id ? { ...item, ...value } : item
            ),
          }));
        }
        set((state) => ({
          draft: [...state.draft, value],
        }));
      },
      setArticle: (data) => set({ article: data }),
    }),
    {
      name: 'Article',
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
