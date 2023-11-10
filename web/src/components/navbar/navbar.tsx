'use client';

import React from 'react';
import { NotificationMenu, SearchMenu, UserMenu, WriteMenu } from './menus';
import { Button } from '../ui/button';
import { useAtom } from 'jotai';
import { openAuthState } from '@/features/auth/store';

export const Navbar = () => {
  const [isUser, setUser] = React.useState<boolean>(false);
  const [openAuth, setOpenAuth] = useAtom(openAuthState);
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 border border-b bg-white">
        <div className="h-[60px] flex items-center px-10 justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Medium</h2>
            <SearchMenu />
          </div>
          <div className="flex items-center gap-2">
            <WriteMenu />
            <NotificationMenu />
            {isUser ? (
              <UserMenu />
            ) : (
              <Button
                className="font-semibold"
                variant={'default'}
                onClick={() => setOpenAuth(true)}
              >
                Sign in
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
