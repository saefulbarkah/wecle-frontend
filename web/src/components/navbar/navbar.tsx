'use client';

import React from 'react';
import { useAuthOverlay } from '@/features/auth/store';
import { SessionType } from '@/hooks/sessions/type';
import { NotificationMenu, SearchMenu, UserMenu, WriteMenu } from './menus';
import { SearchMobile } from './menus/search-mobile';
import { Avatar } from '../ui/avatar';
import Image from 'next/image';

export const Navbar = ({ session }: { session: SessionType }) => {
  const setOverlayAuth = useAuthOverlay((state) => state.setOpen);

  return (
    <>
      <nav
        className={`transition sticky z-40 top-0 left-0 right-0 border border-b bg-white`}
      >
        <div className="h-[60px] flex items-center px-10 justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">WeCle</h2>
            <SearchMenu />
          </div>
          <div className="flex items-center gap-2">
            <WriteMenu session={session} />
            <SearchMobile />
            <NotificationMenu />
            {session ? (
              <UserMenu session={session} />
            ) : (
              <button onClick={() => setOverlayAuth(true)}>
                <Avatar>
                  <Image
                    fill
                    src={
                      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
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
