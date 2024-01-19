"use client";
import React from "react";
import WriteComment from "./comments/write-comment/write-comment";
import ListComment from "./comments/list-comment";
import { ArticleType } from "@/types";
import { useCommentListsArticle } from "../../api/get-comment";
import { Skeleton } from "@/components/ui/skeleton";

const CommentListLoader = () => {
  return Array(3)
    .fill(null)
    .map((item, i) => (
      <React.Fragment key={i}>
        <div className="mt-7">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="w-full">
              <div className="w-full rounded p-3.5 outline outline-1 outline-secondary/50">
                <div className="flex items-center">
                  <Skeleton className="h-3 w-24" />

                  {/* dot */}
                  <Skeleton className="mx-2 h-2 w-2" />

                  <Skeleton className="h-3 w-12" />
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
              <div className="mt-5">
                <Skeleton className="h-6 w-14" />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ));
};

export const Comments = ({ article }: { article: ArticleType }) => {
  const { data: comment, isLoading } = useCommentListsArticle(article._id);

  return (
    <div className="my-5">
      <h2 className="text-2xl font-bold">Top Comments {comment?.length} </h2>
      <WriteComment article={article} />
      {isLoading ? <CommentListLoader /> : <ListComment data={comment} />}
    </div>
  );
};
