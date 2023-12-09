export type ArticleType = {
  _id: string;
  title: string;
  author: {
    _id: string;
    name: string;
    avatar: string;
    user: {
      _id: string;
    };
  };
  content: string;
  comments: {
    _id: string;
    user: {
      _id: string;
      name: string;
      avatar: string;
    };
    text: string;
  }[];
  slug: string;
  date: Date;
};
