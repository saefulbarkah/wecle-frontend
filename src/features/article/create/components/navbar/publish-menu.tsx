"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUpdateArticle } from "@/features/article";
import { useArticleState } from "@/stores/article-store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/stores/auth-store";
import { usePublishArticle } from "@/features/article/api/publish-article";
import { cn } from "@/lib/utils";
import { UploadIcon } from "lucide-react";

type Tbutton = ButtonProps & {
  withIcon?: boolean;
};

export const PublishMenu = ({ buttonProps }: { buttonProps: Tbutton }) => {
  const router = useRouter();
  const resetState = useArticleState((state) => state.reset);
  const token = useAuth((state) => state.token);
  const [showAlert, setShowAlert] = useState(false);
  const article = useArticleState((state) => state.article);
  const [isDisabled, setDisabled] = useState(true);

  const { mutate: UpdateArticle } = useUpdateArticle({
    onSuccess: () => {
      router.replace("/");
      setTimeout(() => {
        resetState();
      }, 1000);
    },
    onSuccessAlertMsg: "Your article has been published",
    onMutateAlertMsg: "Publishing your article, please wait...",
  });

  const { mutateAsync: publishArticle } = usePublishArticle();

  const handlePublish = () => {
    if (isDisabled) return;
    if (!article._id) {
      return publishArticle({
        data: {
          author: article.author,
          content: article.content,
          cover: article.cover,
          title: article.title,
          status: "RELEASE",
        },
        token: token as string,
      });
    }
    UpdateArticle({
      data: {
        status: "RELEASE",
        author: article.author as string,
      },
      id: article._id as string,
      token: token as string,
    });
  };

  useEffect(() => {
    // conditional
    if (article) {
      const isTitleEmpty = article.title;
      const isContentEmpty = article.content;
      if (!isTitleEmpty || !isContentEmpty) return setDisabled(true);
      setDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]);

  return (
    <>
      <div className="relative">
        <Popover
          open={isDisabled ? showAlert : false}
          onOpenChange={setShowAlert}
        >
          <PopoverTrigger asChild>
            <Button
              variant={"success"}
              size={buttonProps?.size || "sm"}
              className={cn(
                `${isDisabled ? "opacity-50" : "opacity-100"} w-full`,
                buttonProps!.className as string,
              )}
              onClick={() => handlePublish()}
            >
              {buttonProps?.withIcon && <UploadIcon />}
              <span className="hidden lg:block">Publish</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="relative hidden translate-y-4 rounded-lg shadow-sm lg:block">
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
