"use client";

import React from "react";
import { PenSquare } from "lucide-react";
import { SessionType } from "@/hooks/sessions/type";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useAuthOverlay } from "@/features/auth/store/auth-overlay-store";

const classVariant = cva([
  "hidden lg:flex items-center gap-2 text-secondary hover:text-black transition hover:bg-secondary-50/80 rounded-md p-2",
]);

const NavigateCreateArticle = ({ session }: { session: SessionType }) => {
  const setAuthOverlay = useAuthOverlay((state) => state.setOpen);
  const Comp = session ? Link : "button";
  return (
    <Comp
      href={"/article/new"}
      className={cn(classVariant())}
      onClick={(e) => {
        if (!session) {
          e.preventDefault();
          return setAuthOverlay(true);
        }
      }}
    >
      <PenSquare className="h-6 w-6" />
      <span className="text-sm font-semibold">Write</span>
    </Comp>
  );
};

export const WriteMenu = ({ session }: { session: SessionType }) => {
  return <NavigateCreateArticle session={session} />;
};
