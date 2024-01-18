export type ApiResponse<TData = null> = {
  status: 200 | 201 | 204 | 400 | 401 | 404 | 500;
  response: "success" | "error";
  message: string;
  error: any;
  data: TData;
};

export type TPagination<TData = null> = {
  nextPage: number | null;
  totalPages: number | null;
  results: TData;
};

export type InfinitePage = {};
