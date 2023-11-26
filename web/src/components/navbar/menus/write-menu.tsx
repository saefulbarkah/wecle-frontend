'use client';

import React from 'react';
import { PenSquare } from 'lucide-react';
import { SessionType } from '@/hooks/sessions/type';
import { useAuthOverlay } from '@/features/auth/store';
import Link from 'next/link';

export const WriteMenu = ({ session }: { session: SessionType }) => {
  const setOverlayAuth = useAuthOverlay((state) => state.setOpen);

  return (
    <Link
      href={`${session ? 'article/new' : '#login'}`}
      className="hidden lg:flex items-center gap-2 text-secondary hover:text-black transition hover:bg-secondary-50/80 rounded-md p-2 "
      onClick={() => {
        if (!session) return setOverlayAuth(true);
      }}
    >
      <PenSquare className="w-6 h-6" />
      <span className="text-sm font-semibold">Write</span>
    </Link>
  );
};
