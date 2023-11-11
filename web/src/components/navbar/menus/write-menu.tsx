'use client';

import React from 'react';
import { PenSquare } from 'lucide-react';
import { useAtom } from 'jotai';
import { openAuthState } from '@/features/auth/store';
import { User } from '@/hooks/sessions/session';

export const WriteMenu = ({ session }: { session: User }) => {
  const [openAuth, setOpenAuth] = useAtom(openAuthState);

  return (
    <button
      className="flex items-center gap-2 text-secondary hover:text-black transition hover:bg-secondary-50/80 rounded-md p-2"
      onClick={() => {
        if (!session) setOpenAuth(true);
      }}
    >
      <PenSquare className="w-6 h-6" />
      <span className="text-sm font-semibold">Write</span>
    </button>
  );
};
