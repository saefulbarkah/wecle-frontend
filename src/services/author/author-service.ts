import api from "@/api";
import { ApiResponse, author } from "@/types";

export class AuthorService {
  private static base_path = "/authors";

  // find author
  static async find(id: string): Promise<author> {
    const response = await api.get<ApiResponse<author>>(
      process.env.NEXT_PUBLIC_BASE_URL_API + this.base_path + "/" + id,
    );
    return response.data.data;
  }

  // follow
  static async follow(authorId: string, targetAuthor: string, token: string) {
    if (authorId === targetAuthor)
      throw new Error("Cannot follow the same author");
    return api.post(
      this.base_path + "/follow",
      {
        author: authorId,
        targetAuthor,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
  }

  // unfollow
  static async unFollow(authorId: string, targetAuthor: string, token: string) {
    if (authorId === targetAuthor) throw new Error("Action is not permitted");
    return api.post(
      this.base_path + "/unfollow",
      {
        author: authorId,
        targetAuthor,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
  }
}
