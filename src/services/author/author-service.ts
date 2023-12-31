import API from "@/api";
import { ApiResponse, author } from "@/types";

export class AuthorService {
  private static base_path = "/authors";

  // find author
  static async find(id: string): Promise<author> {
    try {
      const response = await API.axios.get<ApiResponse<author>>(
        this.base_path + "/" + id,
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  // follow
  static async follow(authorId: string, targetAuthor: string, token: string) {
    if (authorId === targetAuthor)
      throw new Error("Cannot follow the same author");
    return API.axios.post(
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
    return API.axios.post(
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
