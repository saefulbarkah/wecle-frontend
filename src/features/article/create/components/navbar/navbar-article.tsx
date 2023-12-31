"use client";
import React from "react";
import { PublishMenu } from "./publish-menu";
import { NotificationMenu, UserMenu } from "@/components/navbar/menus";
import { DraftMenu } from "./draft-menu";
import { CheckCircle2, Home, Loader2 } from "lucide-react";
import { useEditorStore } from "../Editor/store";
import { useAuth } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const NavbarArticle = () => {
  const session = useAuth((state) => state.session);
  const editorState = useEditorStore((state) => state);
  const router = useRouter();
  return (
    <div className="sticky inset-x-0 top-0 z-50 w-full bg-white">
      <div className="container flex h-[60px] items-center justify-between">
        <div className="flex items-center space-x-5">
          <h2 className="text-xl font-semibold">WeCle</h2>
          <p className="font-serif text-sm">Draft in SaefulBarkah</p>
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
            variant={"default"}
            onClick={() => router.push("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
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
