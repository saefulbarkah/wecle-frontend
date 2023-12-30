import API from "@/api";
import { ApiResponse, ArticleType } from "@/types";

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
}
