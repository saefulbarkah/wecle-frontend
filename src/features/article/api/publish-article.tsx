"use client";
import { TArticleRequestCreate, articleServices } from "@/services/article";
import { ApiResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

type Toptions = {
  onSuccess?: () => void;
  onMutate?: () => void;
};

export const usePublishArticle = (options?: Toptions) => {
  const router = useRouter();
  return useMutation<
    AxiosResponse<ApiResponse>,
    AxiosError<ApiResponse>,
    { data: TArticleRequestCreate; token: string }
  >({
    mutationKey: ["publish-article"],
    mutationFn: ({ data, token }) => articleServices.create({ ...data }, token),
    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
      router.replace("/");
    },
    onMutate: () => {
      if (options?.onMutate) {
        options.onMutate();
      }
    },
  });
};
