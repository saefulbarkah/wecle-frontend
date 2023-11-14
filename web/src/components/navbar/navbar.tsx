'use client';

import React from 'react';
import { NotificationMenu, SearchMenu, UserMenu, WriteMenu } from './menus';
import { Button } from '../ui/button';
import { useAuthOverlay } from '@/features/auth/store';
import { SessionType } from '@/hooks/sessions/type';

export const Navbar = ({ session }: { session: SessionType }) => {
  const setOverlayAuth = useAuthOverlay((state) => state.setOpen);
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 border border-b bg-white">
        <div className="h-[60px] flex items-center px-10 justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Medium</h2>
            <SearchMenu />
          </div>
          <div className="flex items-center gap-2">
            <WriteMenu session={session} />
            <NotificationMenu />
            {session ? (
              <UserMenu session={session} />
            ) : (
              <Button
                className="font-semibold"
                variant={'default'}
                onClick={() => setOverlayAuth(true)}
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
