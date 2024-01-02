import { TDate } from "./global";

export type ArticleType = TDate & {
  _id: string;
  title: string;
  author: TDate & {
    _id: string;
    name: string;
    avatar: string;
    user: string;
  };
  cover: string;
  content: string;
  slug: string;
};
export type ArticleTypeResponse = TDate & {
  _id: string;
  title: string;
  author: string;
  cover: string;
  content: string;
  slug: string;
};
