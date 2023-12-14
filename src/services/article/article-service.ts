import api from '@/api';
import { ApiResponse, ArticleType } from '@/types';

export class articleServices {
  static async findArticle(slug: string): Promise<ArticleType> {
    const response = await api.get<ApiResponse<ArticleType>>(
      `/article/find/${slug}`
    );
    return response.data.data;
  }
}
