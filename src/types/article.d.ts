import { articleType } from "@/stores/article-store";
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
  cover?: {
    name: string;
    src: string;
  };
  content: string;
  slug: string;
};
export type ArticleTypeResponse = TDate & {
  _id: string;
  title: string;
  author: string;
  cover: articleType["cover"];
  staus: articleType["status"];
  content: string;
  slug: string;
};
