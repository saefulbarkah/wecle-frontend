'use client';

import React from 'react';
import { PenSquare } from 'lucide-react';

export const WriteMenu = () => {
  return (
    <button className="flex items-center gap-2 text-secondary hover:text-black transition hover:bg-secondary-50/80 rounded-md p-2">
      <PenSquare className="w-6 h-6" />
      <span className="text-sm font-semibold">Write</span>
    </button>
  );
};
