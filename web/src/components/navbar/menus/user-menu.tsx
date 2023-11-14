'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogout } from '@/features/auth/api/logout';
import { SessionType } from '@/hooks/sessions/type';
import { censorEmail } from '@/lib/utils';
import { Bookmark, Paperclip, SignalHigh, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const menuItems = [
  {
    name: 'Profile',
    icon: <User className="h-5 w-5" />,
    href: '/profile',
  },
  {
    name: 'Library',
    icon: <Bookmark className="h-5 w-5" />,
    href: '#library',
  },
  {
    name: 'Stories',
    icon: <Paperclip className="h-5 w-5" />,
    href: '#stories',
  },
  {
    name: 'Stat',
    icon: <SignalHigh className="h-5 w-5" />,
    href: '#Stat',
  },
];

export const UserMenu = ({ session }: { session: SessionType }) => {
  const { mutate: logout } = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <Image src={session!.avatar} alt={session!.name} fill unoptimized />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[250px] px-0 py-0">
        <div className="flex flex-col my-2">
          {menuItems.map((item, i) => (
            <Link
              href={item.href}
              key={i}
              className="text-secondary hover:text-black transition bg-transparent hover:bg-secondary/5"
            >
              <div className="px-5 py-2 flex items-center gap-2">
                <span>{item.icon}</span>
                <span className="font-semibold text-sm">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
        <hr />
        <div className="my-2">
          <button
            className="flex flex-col gap-2 items-start w-full mt-2 px-5 text-sm"
            onClick={() => logout()}
          >
            <span>Sign out</span>
            <span className="text-xs">{censorEmail(session!.email)}</span>
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
