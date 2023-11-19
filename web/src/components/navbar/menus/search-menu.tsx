'use client';
import React from 'react';
import { Search } from 'lucide-react';

export const SearchMenu = () => {
  return (
    <div className="relative hidden lg:block">
      <input
        type="text"
        className="peer rounded-xl text-sm h-10 bg-secondary-50 placeholder:text-sm pl-10 pr-4 outline-none"
        placeholder="Search"
      />
      <div className="absolute inset-y-0 flex items-center ml-2 text-secondary/80 text-secondary peer-focus:text-secondary">
        <Search className="w-6 h-6" />
      </div>
    </div>
  );
};
