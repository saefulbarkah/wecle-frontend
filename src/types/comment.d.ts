import { ArticleType } from '.';
import { author, authorType } from './author';
import { TDate } from './global';
import { User } from './user';

type article = Partial<Pick<ArticleType, '_id'>>;

type user = Partial<User>;

export type findCommentType = TDate & {
  _id: string;
  text: string;
  article: article;
  user: Pick<user, '_id'> &
    Pick<author, 'name' | 'avatar'> & {
      author_id: string;
    };
  likes: Pick<user, '_id'>[];
};
