"use client";
import React from "react";
import { Search } from "lucide-react";

export const SearchMenu = () => {
  return (
    <div className="relative hidden lg:block">
      <input
        type="text"
        className="peer h-10 rounded-xl bg-secondary-50 pl-10 pr-4 text-sm outline-none placeholder:text-sm dark:bg-secondary-800"
        placeholder="Search"
      />
      <div className="absolute inset-y-0 ml-2 flex items-center text-secondary text-secondary/80 peer-focus:text-secondary">
        <Search className="h-6 w-6" />
      </div>
    </div>
  );
};
