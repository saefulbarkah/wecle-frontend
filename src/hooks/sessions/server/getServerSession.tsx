import { cookies } from "next/headers";
import { SessionType } from "../type";
import { ApiResponse } from "@/types";
import API from "@/api";

export async function getServerSession(): Promise<SessionType> {
  const cookie = cookies();
  const token = cookie.get("auth")?.value;
  const req = {
    token,
  };
  try {
    const response = await API.axios.post<ApiResponse<SessionType>>(
      "/auth/verify",
      req,
    );
    return response.data.data;
  } catch (error) {
    return null;
  }
}
