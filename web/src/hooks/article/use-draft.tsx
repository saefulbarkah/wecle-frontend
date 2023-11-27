'use client';

import { useAuth } from '@/features/auth/store';
import { useArticleState } from '@/stores/article-store';

type createArticle = {
  title: string;
  content: string;
  id: string;
  author_id?: string;
};

interface DraftHookOptions {
  onSuccessCreate?: (val: createArticle) => void;
}

export const useDraft = (options?: DraftHookOptions) => {
  const articleState = useArticleState((state) => state);
  const session = useAuth((state) => state.session);

  const handleCreate = (val: createArticle) => {
    articleState.createArticle({
      title: val.title,
      id: val.id,
      content: val.content,
      author_id: val.author_id,
    });
    if (options?.onSuccessCreate) {
      options.onSuccessCreate(val);
    }
  };

  const filterArticle = (id: string | null) => {
    if (!id) return;
    const find = articleState.draft.find((item) => item.id === id);
    if (!find) return;
    return find;
  };

  return {
    data: articleState.article,
    setArticle: articleState.setArticle,
    session,
    draft: articleState.draft,
    create: handleCreate,
    findArticle: filterArticle,
  };
};
