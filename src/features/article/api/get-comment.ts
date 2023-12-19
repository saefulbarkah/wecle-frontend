import { CommentServices } from '@/services/comment/comment-service';
import { useQuery } from '@tanstack/react-query';

export const useCommentListsArticle = (articleId: string) => {
  return useQuery({
    queryKey: ['comment-article'],
    queryFn: () => CommentServices.findCommentByArticleId(articleId),
  });
};
