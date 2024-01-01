"use client";
import React, { useEffect, useState } from "react";
import { PublishMenu } from "./publish-menu";
import { NotificationMenu, UserMenu } from "@/components/navbar/menus";
import { DraftMenu } from "./draft-menu";
import { CheckCircle2, ChevronLeft, Loader2, Save } from "lucide-react";
import { useEditorStore } from "../Editor/store";
import { useAuth } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSaveDraft } from "@/features/article/api/save-to-draft-article";
import { useArticleState } from "@/stores/article-store";
import toast from "react-hot-toast";

export const NavbarArticle = () => {
  const session = useAuth((state) => state.session);
  const editorState = useEditorStore((state) => state);
  const router = useRouter();
  const { mutateAsync: saveToDraft, isPending: onSavingToDraft } =
    useSaveDraft();
  const article = useArticleState((state) => state.article);
  const [disableSaveToDraft, setDisableSaveToDraft] = useState<boolean>(true);

  const handleSaveToDraft = () => {
    if (!article || !article.title || !article.content) {
      return toast.error("Make sure your content or isnt empty");
    }
    if (!session) {
      setDisableSaveToDraft(true);
      return toast.error("Unauthorized");
    }

    saveToDraft({ data: { ...article }, token: session.token });
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
          <p className="font-serif text-sm">Draft in SaefulBarkah</p>
          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={() => router.push("/")}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            <span>Back</span>
          </Button>
          {editorState.status && (
            <>
              {editorState.status === "writing" && (
                <div className="flex items-center gap-1">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p>Saving....</p>
                </div>
              )}
              {editorState.status === "success" && (
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-6 w-6 fill-primary text-white" />
                  <p className="text-sm">Saved</p>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <Button
            size={"sm"}
            variant={"outline"}
            className="border-primary"
            onClick={() => handleSaveToDraft()}
            disabled={disableSaveToDraft || onSavingToDraft}
            isLoading={onSavingToDraft}
          >
            {!onSavingToDraft && <Save className="mr-2 h-4 w-4" />}
            <span>Save to draft</span>
          </Button>
          <DraftMenu />
          <PublishMenu />
          {/* <OptionMenu /> */}
          <NotificationMenu />
          {session && <UserMenu session={session} />}
        </div>
      </div>
    </div>
  );
};
