import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type article = {
  id: string;
  content: string;
  user_id: string;
  status?: 'draft';
};

type State = {
  draft: article[];
};

type Action = {
  createArticle: (article: article) => void;
};

export const useArticleState = create<State & Action>()(
  persist(
    (set, get) => ({
      draft: [],
      createArticle: (value) => {
        const article = get().draft;
        const filter = article.some((item) => item.id === value.id);
        if (filter) {
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
    }),
    {
      name: 'Article',
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
