import API from "@/api";
import { articleType } from "@/stores/article-store";
import { ApiResponse, ArticleType } from "@/types";

export type TArticleRequestCreate = Pick<
  articleType,
  "author" | "content" | "title" | "status" | "cover"
> & {
  id?: string | null;
};

export class articleServices {
  static async findArticle(slug: string): Promise<ArticleType> {
    const response = await API.axios.get<ApiResponse<ArticleType>>(
      `/article/find/${slug}`,
    );
    return response.data.data;
  }

  static async lists(params: {
    status: "RELEASE" | "DRAFT";
    authorId?: string;
  }): Promise<ArticleType[]> {
    const response = await API.axios.get<ApiResponse<ArticleType[]>>(
      `/article/lists/?status=${params.status}&authorId=${params.authorId}`,
    );
    return response.data.data;
  }

  static async create(data: TArticleRequestCreate, token: string) {
    return API.axios.post<ApiResponse>(
      "/article/create",
      {
        ...data,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
  }
}
