"use client";

import { UploadServices } from "@/services/upload/upload-service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

type ImageInfo = {
  filename: string;
  name: string;
  mime: string;
  extension: string;
  url: string;
};

type ImageData = {
  id: string;
  title: string;
  url_viewer: string;
  url: string;
  display_url: string;
  width: string;
  height: string;
  size: string;
  time: string;
  expiration: string;
  image: ImageInfo;
  thumb: ImageInfo;
  medium: ImageInfo;
  delete_url: string;
};

type ApiResponse = {
  data: ImageData;
  success: boolean;
  status: number;
};

type TOptions = {
  onSuccess?: () => void;
  onMutate?: () => void;
};

export const useImbbUpload = (options?: TOptions) => {
  return useMutation<AxiosResponse<ApiResponse>, AxiosError, { image: string }>(
    {
      mutationKey: ["upload-image"],
      mutationFn: (data) => UploadServices.Upload(data.image),
      onMutate: () => {
        if (options?.onMutate) {
          options.onMutate();
        }
      },
    },
  );
};
