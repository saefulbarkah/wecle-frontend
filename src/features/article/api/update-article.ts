"use client";

import API from "@/api";
import { articleType } from "@/stores/article-store";
import { ApiResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

type post = Partial<Pick<articleType, "content" | "title" | "cover">> & {
  author: string;
  status?: "RELEASE" | "DRAFT";
};

type response = AxiosResponse<ApiResponse<Partial<post>>>;

type requestMutation = {
  data: post;
  id: string;
  token: string;
};

const post = ({ data, id, token }: requestMutation) => {
  return API.axios.put<post, response, post>(
    `/article/update/${id}`,
    {
      content: data.content,
      title: data.title,
      author: data.author,
      status: data.status,
      cover: data.cover,
    },
    {
      headers: {
        Authorization: "bearer " + token,
      },
    },
  );
};

type overrideOptions = {
  onSuccess?: () => void;
  onSuccessAlertMsg?: string;
  onMutateAlertMsg?: string;
};

export const useUpdateArticle = (options: overrideOptions = {}) => {
  const idLoading = "publishing-article";

  return useMutation<response, AxiosError<ApiResponse>, requestMutation>({
    mutationKey: ["update-article"],
    mutationFn: ({ data, id, token }) => post({ data, id, token: token }),
    onSuccess: (res, data) => {
      console.log(data.data.cover);

      // alert on success
      if (options.onSuccessAlertMsg) {
        toast.success(options.onSuccessAlertMsg, { id: idLoading });
      } else {
        toast.success(res.data.message, { id: idLoading });
      }

      // extends function on success
      if (options.onSuccess) {
        options.onSuccess();
      }
    },
    onMutate: () => {
      // alert on mutation
      if (options.onMutateAlertMsg) {
        toast.loading(options.onMutateAlertMsg, { id: idLoading });
      } else {
        toast.loading("Updating your article....", { id: idLoading });
      }
    },
    onError: (res) => {
      const data = res.response?.data;
      if (data?.status === 400) {
        return toast.error(data.message, { id: idLoading });
      }
    },
  });
};
