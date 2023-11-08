'use client';
import React from 'react';
import { Bell } from 'lucide-react';

export const NotificationMenu = () => {
  return (
    <button className="transition text-secondary hover:text-black p-2 hover:bg-secondary-50 rounded-full">
      <Bell />
    </button>
  );
};
