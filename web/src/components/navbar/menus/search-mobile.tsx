'use client';
import { Button } from '@/components/ui/button';
import { LucideSearch } from 'lucide-react';
import React from 'react';

export const SearchMobile = () => {
  return (
    <div className="block lg:hidden">
      <Button variant={'ghost'} size={'icon'}>
        <LucideSearch />
      </Button>
    </div>
  );
};
