'use client';
import React from 'react';
import { Bell } from 'lucide-react';
import { BsFillTriangleFill } from 'react-icons/bs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';

export const NotificationMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="transition text-secondary hover:text-black p-2 hover:bg-secondary-50 rounded-full">
          <Bell />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 -translate-x-5 translate-y-2 relative p-0">
        <div className="relative">
          <div className="p-2 flex items-center justify-between">
            <h2 className="font-semibold">Notifications</h2>
            <Button
              variant={'ghost'}
              size={'sm'}
              className="text-primary hover:bg-primary/10 p-2 h-6 hover:text-primary-600"
            >
              Mark as read
            </Button>
          </div>
          <hr />
          <div className="overflow-y-auto h-80">
            <div className="flex flex-col pb-10">
              {Array(10)
                .fill(null)
                .map((item, i) => (
                  <React.Fragment key={i}>
                    <div
                      className={`flex justify-between px-5 py-3 cursor-pointer transition ${
                        i > 2 ? 'bg-white hover:bg-primary/5' : 'bg-primary/5'
                      }`}
                    >
                      <div className="flex gap-2">
                        <Avatar className="w-8 h-8">
                          <Image
                            src={'https://github.com/shadcn.png'}
                            alt="testing"
                            fill
                            unoptimized
                          />
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="font-semibold text-xs">lorem</p>
                          <p className="text-xs line-clamp-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eius, nobis.
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </React.Fragment>
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
