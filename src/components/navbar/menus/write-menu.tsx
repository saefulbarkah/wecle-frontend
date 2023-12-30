"use client";

import React from "react";
import { PenSquare } from "lucide-react";
import { SessionType } from "@/hooks/sessions/type";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const classVariant = cva([
  "hidden lg:flex items-center gap-2 text-secondary hover:text-black transition hover:bg-secondary-50/80 rounded-md p-2",
]);

const NavigateCreateArticle = () => {
  return (
    <Link href={"/article/new"} className={cn(classVariant())}>
      <PenSquare className="h-6 w-6" />
      <span className="text-sm font-semibold">Write</span>
    </Link>
  );
};

const TriggerLogin = ({ session }: { session: SessionType }) => {
  return (
    <Link className={cn(classVariant())} href={"/auth/login"}>
      <PenSquare className="h-6 w-6" />
      <span className="text-sm font-semibold">Write</span>
    </Link>
  );
};

export const WriteMenu = ({ session }: { session: SessionType }) => {
  return session ? (
    <NavigateCreateArticle />
  ) : (
    <TriggerLogin session={session} />
  );
};
