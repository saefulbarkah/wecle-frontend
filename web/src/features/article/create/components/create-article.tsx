'use client';

import { CreatePortal } from '@/components/create-portal';
import { LucideChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import NavbarArticle from './navbar/navbar-article';

export const CreateArticle = () => {
  return (
    <CreatePortal>
      <NavbarArticle />
      <div className="h-screen overflow-y-auto">
        <div className="container"></div>
      </div>
    </CreatePortal>
  );
};
