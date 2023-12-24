import { ApiResponse, author } from "@/types";

export class AuthorService {
  // find author
  static async find(id: string): Promise<author> {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL_API + "/authors/" + id,
      );
      const data: ApiResponse<author> = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }
}
