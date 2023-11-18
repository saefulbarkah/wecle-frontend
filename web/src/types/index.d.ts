export type ApiResponse<TData = null> = {
  status: 200 | 201 | 204 | 400 | 401 | 404 | 500;
  response: 'success' | 'error';
  message: string;
  error: any;
  data: TData;
};

export type ArticleType = {
  _id: string;
  title: string;
  author: {
    _id: string;
    user: {
      _id: string;
      name: string;
      avatar: string;
    };
    name: string;
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
