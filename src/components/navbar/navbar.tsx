"use client";

import React from "react";
import { NotificationMenu, SearchMenu, UserMenu, WriteMenu } from "./menus";
import { SearchMobile } from "./menus/search-mobile";
import { Avatar } from "../ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@/stores/auth-store";
import { useAuthOverlay } from "@/features/auth/store/auth-overlay-store";
import { ThemeSwitch } from "./menus/theme-switch";

export const Navbar = () => {
  const session = useAuth((state) => state.session);
  const setOpenAuth = useAuthOverlay((state) => state.setOpen);

  return (
    <>
      <nav
        className={`sticky left-0 right-0 top-0 z-40 border-b bg-white dark:border-b dark:border-white/10 dark:bg-dark`}
      >
        <div className="flex h-[60px] items-center justify-between px-10">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">WeCle</h2>
            <SearchMenu />
            <div className="flex items-center gap-2">
              <Link href={"/"} className="hidden sm:block">
                <Button size={"sm"} variant={"ghost"} className="text-md">
                  Home
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <WriteMenu session={session} />
            <SearchMobile />
            {session && <NotificationMenu />}
            {session ? (
              <UserMenu session={session} />
            ) : (
              <button onClick={() => setOpenAuth(true)}>
                <Avatar>
                  <Image
                    fill
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                    }
                    priority
                    alt="placeholder"
                    unoptimized
                  />
                </Avatar>
              </button>
            )}
            <ThemeSwitch />
          </div>
        </div>
      </nav>
    </>
  );
};
