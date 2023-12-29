"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUpdateArticle } from "@/features/article";
import { useAuth } from "@/features/auth/store";
import { useArticleState } from "@/stores/article-store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useEditorStore } from "../Editor/store";

export const PublishMenu = () => {
  const router = useRouter();
  const resetState = useArticleState((state) => state.reset);
  const token = useAuth((state) => state.token);
  const [showAlert, setShowAlert] = useState(false);
  const article = useArticleState((state) => state.article);
  const status = useEditorStore((state) => state.status);

  const { mutate } = useUpdateArticle({
    onSuccess: () => {
      router.replace("/");
      setTimeout(() => {
        resetState();
      }, 1000);
    },
    onSuccessAlertMsg: "Your article has been published",
    onMutateAlertMsg: "Publishing your article, please wait...",
  });

  // conditional
  const isTitleEmpty = article?.title?.trim() !== "";
  const isContentEmpty = article.content !== null;
  const isOnSavingToDraft = status !== "writing";

  const handlePublish = () => {
    if (!article._id || !article.content) return;
    if (!isOnSavingToDraft) return;
    mutate({
      data: {
        status: "RELEASE",
        author: article.author as string,
      },
      id: article._id as string,
      token: token as string,
    });
  };

  return (
    <>
      <div className="relative">
        <Popover
          open={
            isTitleEmpty && isContentEmpty && isOnSavingToDraft
              ? false
              : showAlert
          }
          onOpenChange={setShowAlert}
        >
          <PopoverTrigger asChild>
            <Button
              variant={"success"}
              size={"sm"}
              className={`${
                isTitleEmpty && isContentEmpty && isOnSavingToDraft
                  ? "opacity-100"
                  : "opacity-50"
              }`}
              onClick={() => handlePublish()}
            >
              Publish
            </Button>
          </PopoverTrigger>
          <PopoverContent className="relative translate-y-4 rounded-lg shadow-sm">
            <i className="pointer-events-none absolute inset-x-0 top-0 -translate-y-3 translate-x-[80%] cursor-none sm:translate-x-[75%] md:translate-x-[75%] lg:translate-x-[48%]">
              <svg xmlns="http://www.w3.org/2000/svg">
                {/* Main Triangle */}
                <polygon
                  points="7.538,2 1,12 14,12"
                  fill="white" // Make the triangle transparent to show only the border
                />

                {/* Top-Left Border */}
                <polygon
                  points="7.538,2 1,12 7.538,2"
                  stroke="rgba(100, 116, 139, 0.2)" // Border color
                  strokeWidth="0.7" // Border width
                  fill="transparent" // Make the triangle transparent to show only the border
                />

                {/* Right Border */}
                <polygon
                  points="7.538,2 14,12 7.538,2"
                  stroke="rgba(100, 116, 139, 0.2)" // Border color
                  strokeWidth="0.7" // Border width
                  fill="transparent" // Make the triangle transparent to show only the border
                />
              </svg>
            </i>
            <p className="text-center font-semibold text-danger">
              You are disallowed to publish when content is empty
            </p>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};
