'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDraftLists } from '@/features/article/api/draft-list';
import { ArticleType } from '@/types';
import { LucideArchive, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

export const DraftMenu = () => {
  const router = useRouter();
  const query = useSearchParams().get('draftId');
  const [open, setOpen] = useState(false);
  const { data } = useDraftLists();

  const [search, setSearch] = useState<string>('');

  // memoize data client side
  const draft = useMemo(() => {
    if (!search) return data;
    return data?.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, data]);

  const handleDraft = (data: ArticleType) => {
    router.push('?draftId=' + data._id);
    setOpen(false);
  };

  useEffect(() => {
    setSearch('');
  }, [open]);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={'sm'} variant={'dark'}>
            <LucideArchive className="mr-2 h-4 w-4" />
            <span>Draft</span>
          </Button>
        </DialogTrigger>
        <DialogOverlay className="bg-black/20 z-50" />
        <DialogContent className="p-0 h-screen w-full sm:h-96 sm:max-w-lg overflow-hidden">
          <div>
            {/* search draft */}
            <label className="relative" htmlFor="search-draft">
              <div className="absolute inset-y-0 left-0 flex items-center translate-x-4 cursor-text">
                <Search size={24} className="text-secondary" />
              </div>
              <input
                type="text"
                className="w-full h-12 outline-none pl-12 pr-10 border-b text-lg"
                placeholder="Search draft..."
                id="search-draft"
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>

            {/* check if not search and original data array 0 send a message */}
            {draft?.length === 0 && !search && (
              <div className="flex items-center w-full justify-center mt-[120px]">
                <p className="text-lg">Draft is empty</p>
              </div>
            )}

            {/* check if on search and results array 0 send a message */}
            {draft?.length === 0 && search && (
              <div className="flex items-center w-full justify-center mt-[120px]">
                <p className="text-lg">Result not found</p>
              </div>
            )}

            {/* item draft */}
            <ScrollArea className="w-full h-screen sm:h-96">
              <div className="mt-2 mb-5 divide-y">
                {draft?.map((item, i) => (
                  <React.Fragment key={i}>
                    <button
                      className={`flex py-2 w-full text-start items-center hover:bg-blue-50 cursor-pointer ${
                        item._id === query && 'bg-blue-50'
                      }`}
                      onClick={() => handleDraft(item)}
                    >
                      <div className="px-4">
                        <p className="line-clamp-1 text-md capitalize">
                          {item.title}
                        </p>
                      </div>
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
