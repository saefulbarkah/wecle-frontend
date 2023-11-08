'use client';

import React from 'react';
import {
  AuthMenu,
  NotificationMenu,
  SearchMenu,
  UserMenu,
  WriteMenu,
} from './menus';

export const Navbar = () => {
  const [isUser, setUser] = React.useState<boolean>(false);
  return (
    <nav className="fixed top-0 left-0 right-0 border border-b bg-white">
      <div className="h-[60px] flex items-center px-10 justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Medium</h2>
          <SearchMenu />
        </div>
        <div className="flex items-center gap-2">
          <WriteMenu />
          <NotificationMenu />
          {isUser ? <UserMenu /> : <AuthMenu />}
        </div>
      </div>
    </nav>
  );
};
