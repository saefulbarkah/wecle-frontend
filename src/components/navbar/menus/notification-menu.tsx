/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from 'react';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import {
  useNotification,
  useReadAllNotification,
  useReadOneNotification,
} from '@/hooks/use-notification';
import { timeAgo } from '@/lib/time';
import Link from 'next/link';

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <button className="transition text-secondary hover:text-black p-2 hover:bg-secondary-50 rounded-full">
            <Bell />
          </button>
          {unreadCount && (
            <div className="absolute w-5 h-5 bg-red-500 top-0 right-0 rounded-full flex items-center justify-center">
              <span className="text-[10px] text-white">{unreadCount}</span>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 translate-y-2 relative p-0">
        <div className="relative">
          <div className="p-2 flex items-center justify-between">
            <h2 className="font-semibold">Notifications</h2>
            {isReadingAll ? (
              <p>loading...</p>
            ) : (
              <Button
                variant={'ghost'}
                size={'sm'}
                className="text-primary hover:bg-primary/10 p-2 h-6 hover:text-primary-600"
                onClick={() => handleReadAllNotification()}
              >
                Mark all as read
              </Button>
            )}
          </div>
          <hr />
          <div className="overflow-y-auto h-80">
            <div className="flex flex-col pb-10">
              {data?.map((item, i) => (
                <DropdownMenuItem key={i} className="p-0">
                  <Link
                    className={`flex justify-between px-5 py-3 cursor-pointer transition w-full ${
                      item.readAt
                        ? 'bg-white hover:bg-primary/5'
                        : 'bg-primary/5'
                    }`}
                    href={item.targetUrl}
                    target="_blank"
                    onClick={() =>
                      handleReadNotification(item._id, item.receiver._id)
                    }
                  >
                    <div className="flex gap-2">
                      <Avatar className="w-8 h-8">
                        <Image
                          src={item.sender.author.avatar}
                          alt="testing"
                          fill
                          unoptimized
                        />
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-xs">{timeAgo(item.createdAt)}</p>
                        <p className="text-xs line-clamp-1">
                          <span className="font-semibold mr-1">
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
          <div className="absolute bottom-0 inset-x-0 flex items-center justify-center bg-white border shadow">
            <Button variant={'link'}>View all notification</Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
