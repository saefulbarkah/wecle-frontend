import { findCommentByArticleId } from '@/services/comment/comment-service';
import { useQuery } from '@tanstack/react-query';

export const useCommentListsArticle = (articleId: string) => {
  return useQuery({
    queryKey: ['comment-article'],
    queryFn: () => findCommentByArticleId({ articleId: articleId }),
  });
};
