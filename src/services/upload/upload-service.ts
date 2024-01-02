import API from "@/api";
import { IMG_BB } from "@/api/imgbb";
import { AxiosResponse } from "axios";

type TUploadReq = {
  image: string;
};

export class UploadServices {
  static async Upload(image: string) {
    try {
      return API.imgbb.post<any, AxiosResponse, TUploadReq>(
        `/1/upload?key=${IMG_BB}`,
        {
          image,
        },
      );
    } catch (error) {
      throw error;
    }
  }
}
