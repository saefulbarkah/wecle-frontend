"use client";
import { useAuth } from "@/features/auth/store";
import { AuthorService } from "@/services/author/author-service";
import { ApiResponse, author } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useMemo } from "react";
import toast from "react-hot-toast";

type TRequestFollow = {
  authorId: string;
  targetAuthor: string;
  token: string;
};

const useFollowing = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<ApiResponse>,
    AxiosError<ApiResponse>,
    TRequestFollow
  >({
    mutationKey: ["following"],
    mutationFn: ({ authorId, targetAuthor, token }) =>
      AuthorService.follow(authorId, targetAuthor, token),
    onError: (res) => {
      const errorMessage = res.response?.data.message as string;
      toast.error(errorMessage);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["author-info"] });
    },
  });
};

export const useFollow = ({ data }: { data?: author } = {}) => {
  const { mutateAsync: followRequest, ...props } = useFollowing();
  const session = useAuth((state) => state.session);
  const onFollowing = (authorId: string, targetAuthor: string) => {
    if (session) {
      followRequest({
        authorId,
        targetAuthor,
        token: session.token,
      });
    }
  };

  const isFollowing = useMemo(() => {
    if (!session) return;
    return data?.followers.some(
      (item) => item.author._id === session.author_id,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return { onFollowing, session, isFollowing, ...props };
};
