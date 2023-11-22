'use client';
import React from 'react';
import { PublishMenu } from './publish-menu';
import { NotificationMenu, UserMenu } from '@/components/navbar/menus';
import { useAuth } from '@/features/auth/store';

export const NavbarArticle = () => {
  const session = useAuth((state) => state.session);
  return (
    <div className="sticky top-0 inset-x-0 w-full">
      <div className="container h-[60px] flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <h2 className="text-xl font-semibold">WeCle</h2>
          <p className="font-serif text-sm">Draft in SaefulBarkah</p>
        </div>
        <div className="flex items-center space-x-3">
          <PublishMenu />
          {/* <OptionMenu /> */}
          <NotificationMenu />
          {session && <UserMenu session={session} />}
        </div>
      </div>
    </div>
  );
};
