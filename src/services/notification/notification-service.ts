import API from "@/api";
import { ApiResponse } from "@/types";
import { Notification } from "@/types/notification";
import { AxiosResponse } from "axios";
const BASE_URL = "/notifications";

export default class NotificationService {
  static async findByUserId(userId: string, token: string) {
    const response = await API.axios.get<ApiResponse<Notification[]>>(
      `${BASE_URL}/find/${userId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
    return response.data.data;
  }

  static async readAll(userId: string, token: string) {
    return API.axios.post<any, AxiosResponse<ApiResponse>, { userId: string }>(
      `${BASE_URL}/read-all`,
      {
        userId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
  }

  static async readOne(id: string, userId: string, token: string) {
    return API.axios.post<
      any,
      AxiosResponse<ApiResponse>,
      { id: string; userId: string }
    >(
      `${BASE_URL}/read-one`,
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
