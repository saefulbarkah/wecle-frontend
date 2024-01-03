/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  useNotification,
  useReadAllNotification,
  useReadOneNotification,
} from "@/hooks/use-notification";
import { timeAgo } from "@/lib/time";
import Link from "next/link";
import { Notification } from "@/types/notification";

export const NotificationMenu = () => {
  const { data, auth, unreadCount } = useNotification();
  const { mutate: readOne } = useReadOneNotification();
  const { mutate: readAll, isPending: isReadingAll } = useReadAllNotification();

  const handleReadNotification = (id: string, userId: string) => {
    if (!auth) return;
    readOne({
      id: id,
      userId: userId,
      token: auth.token as string,
    });
  };

  const handleReadAllNotification = () => {
    if (!auth || !unreadCount) return;
    readAll({
      userId: auth.id as string,
      token: auth.token as string,
    });
  };

  const getNotificationRoute = (
    value: Notification["type"],
    target: string,
  ) => {
    switch (value) {
      case "comment":
        return "/article/" + target;

      case "follow":
        return "/author/" + target;

      default:
        return "/";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <button className="rounded-full p-2 text-secondary transition hover:bg-secondary-50 hover:text-black">
            <Bell />
          </button>
          {unreadCount && (
            <div className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
              <span className="text-[10px] text-white">{unreadCount}</span>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative w-96 translate-y-2 p-0">
        <div className="relative">
          <div className="flex items-center justify-between p-2">
            <h2 className="font-semibold">Notifications</h2>
            {isReadingAll ? (
              <p>loading...</p>
            ) : (
              <Button
                variant={"ghost"}
                size={"sm"}
                className="h-6 p-2 text-primary hover:bg-primary/10 hover:text-primary-600"
                onClick={() => handleReadAllNotification()}
              >
                Mark all as read
              </Button>
            )}
          </div>
          <hr />
          <div className="h-80 overflow-y-auto">
            <div className="flex flex-col pb-10">
              {data?.map((item, i) => (
                <DropdownMenuItem key={i} className="p-0">
                  <Link
                    className={`flex w-full cursor-pointer justify-between px-5 py-3 transition ${
                      item.readAt
                        ? "bg-white hover:bg-primary/5"
                        : "bg-primary/5"
                    }`}
                    href={getNotificationRoute(item.type, item.targetUrl)}
                    target="_blank"
                    onClick={() =>
                      handleReadNotification(item._id, item.receiver._id)
                    }
                  >
                    <div className="flex gap-2">
                      <Image
                        src={item.sender.author.avatar}
                        alt="testing"
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="text-xs">{timeAgo(item.createdAt)}</p>
                        <p className="line-clamp-1 text-xs">
                          <span className="mr-1 font-semibold">
                            {item.sender.author.name}
                          </span>
                          {item.message}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <hr />
                </DropdownMenuItem>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center border bg-white shadow">
            <Button variant={"link"}>View all notification</Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
