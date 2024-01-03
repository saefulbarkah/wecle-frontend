"use client";
import React, { useEffect, useState } from "react";
import { PublishMenu } from "./publish-menu";
import { NotificationMenu, UserMenu } from "@/components/navbar/menus";
import { DraftMenu } from "./draft-menu";
import { ChevronLeft, ChevronUp, Save } from "lucide-react";
import { useAuth } from "@/stores/auth-store";
import { Button, ButtonProps } from "@/components/ui/button";
import { useSaveDraft } from "@/features/article/api/save-to-draft-article";
import { useArticleState } from "@/stores/article-store";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { useUploaImage } from "@/hooks/use-upload-image";

const NavigateBack = () => {
  const reset = useArticleState((state) => state.reset);

  return (
    <Link href="/" onClick={() => reset()}>
      <Button size={"sm"} variant={"ghost"}>
        <ChevronLeft className="mr-1 h-4 w-4" />
        <span>Back</span>
      </Button>
    </Link>
  );
};

type TSaveDraft = ButtonProps & {
  label?: string;
  onSaving: () => void;
};
const SaveDraft = ({
  label,
  isLoading,
  onSaving,
  className,
  ...props
}: TSaveDraft) => {
  return (
    <Button
      className={cn("border-primary", className)}
      onClick={() => onSaving()}
      isLoading={isLoading}
      {...props}
    >
      {!isLoading && <Save className="lg:mr-2 lg:h-4 lg:w-4" />}
      {label && <span>{label}</span>}
    </Button>
  );
};

export const NavbarArticle = () => {
  const isSavingID = "saving-draft";

  const [menuMobile, setMenuMobile] = useState(false);
  const session = useAuth((state) => state.session);
  const { mutateAsync: saveToDraft, isPending: onSavingToDraft } = useSaveDraft(
    {
      onSuccess: (res) => {
        toast.success(res.data.message, {
          id: isSavingID,
        });
      },
      onMutate: () => {
        toast.loading("Saving draft....", {
          id: isSavingID,
        });
      },
    },
  );
  const article = useArticleState((state) => state.article);
  const [disableSaveToDraft, setDisableSaveToDraft] = useState<boolean>(true);
  const { uploadCoverArticle } = useUploaImage({
    onMutate: () => {
      toast.loading("Saving draft....", {
        id: isSavingID,
      });
    },
  });

  const handleSaveToDraft = async () => {
    if (!article || !article.title || !article.content) {
      return toast.error("Make sure your content or isnt empty");
    }
    if (!session) {
      setDisableSaveToDraft(true);
      return toast.error("Unauthorized");
    }
    // uploading image cover
    const cover = await uploadCoverArticle(article);

    saveToDraft({
      data: {
        id: article._id,
        author: article.author as string,
        content: article.content,
        title: article.title,
        cover: cover,
      },
      token: session.token,
    });
  };

  useEffect(() => {
    if (session) {
      setDisableSaveToDraft(false);
    }
  }, [session, article]);

  return (
    <div className="sticky inset-x-0 top-0 z-50 w-full bg-white">
      <div className="container flex h-[60px] items-center justify-between">
        <div className="flex items-center space-x-5">
          <h2 className="text-xl font-semibold">WeCle</h2>
          <p className="hidden truncate font-serif text-sm lg:block">
            Draft in {session?.name}
          </p>
          <NavigateBack />
        </div>
        <div className="flex items-center space-x-3">
          <div className="hidden items-center space-x-3 lg:flex">
            {/* desktop menus */}
            <SaveDraft
              variant={"outline"}
              size={"sm"}
              onSaving={handleSaveToDraft}
              disabled={disableSaveToDraft || onSavingToDraft}
              isLoading={onSavingToDraft}
              label="Saving to Draft"
            />
            <DraftMenu
              buttonProps={{
                size: "sm",
              }}
            />
            <PublishMenu
              buttonProps={{
                className: "h-10 lg:h-9",
              }}
            />
          </div>

          <NotificationMenu />
          {session && <UserMenu session={session} />}
        </div>

        {/* mobile options */}
        <Popover open={menuMobile} onOpenChange={setMenuMobile}>
          <PopoverTrigger asChild>
            <div className="fixed bottom-0 right-0 mb-5 mr-5 lg:hidden">
              <Button
                variant={"destructive"}
                size={"icon"}
                className="h-12 w-12 rounded-full"
              >
                <ChevronUp />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex w-0 items-center justify-center border-none bg-transparent shadow-none lg:hidden">
            <div className="flex flex-col gap-3">
              <SaveDraft
                variant={"default"}
                size={"icon"}
                className="h-12 w-12 rounded-full"
                onSaving={handleSaveToDraft}
                disabled={disableSaveToDraft || onSavingToDraft}
                isLoading={onSavingToDraft}
              />
              <DraftMenu
                buttonProps={{
                  size: "icon",
                  className: "h-12 w-12 rounded-full",
                }}
              />
              <PublishMenu
                buttonProps={{
                  withIcon: true,
                  size: "icon",
                  className: "h-12 w-12 rounded-full",
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
