"use client";
import { TArticleRequestCreate, articleServices } from "@/services/article";
import { ApiResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const usePublishArticle = () => {
  const router = useRouter();
  const idLoading = "publishing-article";
  return useMutation<
    AxiosResponse<ApiResponse>,
    AxiosError<ApiResponse>,
    { data: TArticleRequestCreate; token: string }
  >({
    mutationKey: ["publish-article"],
    mutationFn: ({ data, token }) => articleServices.create({ ...data }, token),
    onSuccess: () => {
      toast.success("Your article has been published", { id: idLoading });
      router.replace("/");
    },
    onError: (e, data) => {
      console.log(data);
    },
    onMutate: () => {
      toast.loading("Publishing your article, please wait...", {
        id: idLoading,
      });
    },
  });
};
