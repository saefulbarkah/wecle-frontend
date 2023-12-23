import { ApiResponse, author } from "@/types";
import { cookies } from "next/headers";

export class AuthorService {
  // find author
  static async find(id: string): Promise<author> {
    const cookie = cookies();
    const token = cookie.get("auth")?.value;
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL_API + "/authors/" + id,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      const data: ApiResponse<author> = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }
}
