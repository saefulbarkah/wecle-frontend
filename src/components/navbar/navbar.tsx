"use client";

import React from "react";
import { useAuth, useAuthOverlay } from "@/features/auth/store";
import { NotificationMenu, SearchMenu, UserMenu, WriteMenu } from "./menus";
import { SearchMobile } from "./menus/search-mobile";
import { Avatar } from "../ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export const Navbar = () => {
  const setOverlayAuth = useAuthOverlay((state) => state.setOpen);
  const session = useAuth((state) => state.session);

  return (
    <>
      <nav
        className={`sticky left-0 right-0 top-0 z-40 border border-b bg-white transition`}
      >
        <div className="flex h-[60px] items-center justify-between px-10">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">WeCle</h2>
            <SearchMenu />
            <div className="flex items-center gap-2">
              <Link href={"/"}>
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="text-md text-secondary/80 hover:text-black"
                >
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
              <button onClick={() => setOverlayAuth(true)}>
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
          </div>
        </div>
      </nav>
    </>
  );
};
