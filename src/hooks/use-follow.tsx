"use client";
import { useAuth } from "@/features/auth/store";
import { AuthorService } from "@/services/author/author-service";
import { ApiResponse, author, follow } from "@/types";
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
  const session = useAuth((state) => state.session);
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
      const data = queryClient.getQueryData<author>(["author-info"]);

      queryClient.setQueryData(["author-info"], (oldData: author): author => {
        let results = oldData;
        if (data) {
          results = {
            ...oldData,
            followers: [
              ...data?.followers,
              {
                _id: "",
                author: {
                  _id: session?.author_id as string,
                  avatar: session?.avatar as string,
                  name: session?.name as string,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              },
            ],
          };
        }
        toast;
        return results;
      });
    },
  });
};

const useUnFollowAPI = () => {
  const session = useAuth((state) => state.session);
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<ApiResponse>,
    AxiosError<ApiResponse>,
    TRequestFollow
  >({
    mutationKey: ["unfollowing"],
    mutationFn: ({ authorId, targetAuthor, token }) =>
      AuthorService.unFollow(authorId, targetAuthor, token),
    onError: (res) => {
      const errorMessage = res.response?.data.message as string;
      toast.error(errorMessage);
    },
    onSettled: async (res) => {
      const data = queryClient.getQueryData<author>(["author-info"]);
      const newDataFollower: follow[] | undefined = data?.followers.filter(
        (item) => item.author._id !== session?.author_id,
      );

      queryClient.setQueryData(["author-info"], (oldData: author): author => {
        let results = oldData;
        if (newDataFollower) {
          results = {
            ...oldData,
            followers: newDataFollower,
          };
        }
        return results;
      });
    },
  });
};

export const useFollow = () => {
  const queryClient = useQueryClient();
  const dataAuthor: author | undefined = queryClient.getQueryData([
    "author-info",
  ]);
  const { mutateAsync: followRequest, ...followProps } = useFollowing();
  const session = useAuth((state) => state.session);

  // following author
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
    return dataAuthor?.followers.some(
      (item) => item.author._id === session.author_id,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, dataAuthor]);

  return { onFollowing, session, isFollowing, ...followProps };
};

export const useUnFollow = () => {
  const { mutateAsync: unFollowRequest, ...unFollowProps } = useUnFollowAPI();
  const session = useAuth((state) => state.session);

  // unFollow author
  const onUnFollow = (authorId: string, targetAuthor: string) => {
    if (session) {
      unFollowRequest({
        authorId,
        targetAuthor,
        token: session.token,
      });
    }
  };

  return { onUnFollow, unFollowRequest, ...unFollowProps };
};
