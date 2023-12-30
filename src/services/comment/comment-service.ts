import API from "@/api";
import { ApiResponse, findCommentType } from "@/types";
import { AxiosResponse } from "axios";

export type createCommentType = {
  userId: string;
  articleId: string;
  text: string;
};

export type likeCommentType = {
  id: string;
  userId: string;
};

type createResponse = AxiosResponse<ApiResponse>;

export class CommentServices {
  static async findCommentByArticleId(articleId: string) {
    const response = await API.axios.get<ApiResponse<findCommentType[]>>(
      `/comments/article/` + articleId,
    );
    return response.data.data;
  }

  static async createNewCommentArticle(
    data: createCommentType,
    token: string,
  ): Promise<createResponse> {
    const { articleId, text, userId } = data;
    return API.axios.post<any, createResponse, createCommentType>(
      "/comments",
      {
        articleId,
        text,
        userId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
  }

  static async likeComment(data: likeCommentType, token: string) {
    const { id, userId } = data;
    return API.axios.post<any, createResponse, likeCommentType>(
      "/comments/like",
      {
        id,
        userId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
  }

  static async dislikeComment(data: likeCommentType, token: string) {
    const { id, userId } = data;
    return API.axios.post<any, createResponse, likeCommentType>(
      "/comments/dislike",
      {
        id,
        userId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
  }
}
