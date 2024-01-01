"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDraftLists } from "@/features/article/api/draft-list";
import { cn } from "@/lib/utils";
import { ArticleType } from "@/types";
import { LucideArchive, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

export const DraftMenu = ({ buttonProps }: { buttonProps?: ButtonProps }) => {
  const router = useRouter();
  const query = useSearchParams().get("draftId");
  const [open, setOpen] = useState(false);
  const { data } = useDraftLists();

  const [search, setSearch] = useState<string>("");

  // memoize data client side
  const draft = useMemo(() => {
    if (!search) return data;
    return data?.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, data]);

  const handleDraft = (data: ArticleType) => {
    router.push("?draftId=" + data._id);
    setOpen(false);
  };

  useEffect(() => {
    setSearch("");
  }, [open]);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size={buttonProps?.size || "sm"}
            variant={"dark"}
            className={cn("w-full", buttonProps?.className)}
          >
            <LucideArchive className="lg:mr-2 lg:h-4 lg:w-4" />
            <span className="hidden lg:block">Draft</span>
          </Button>
        </DialogTrigger>
        <DialogOverlay className="z-50 bg-black/20" />
        <DialogContent className="h-screen w-full overflow-hidden p-0 sm:h-96 sm:max-w-lg">
          <div>
            {/* search draft */}
            <label className="relative" htmlFor="search-draft">
              <div className="absolute inset-y-0 left-0 flex translate-x-4 cursor-text items-center">
                <Search size={24} className="text-secondary" />
              </div>
              <input
                type="text"
                className="h-12 w-full border-b pl-12 pr-10 text-lg outline-none"
                placeholder="Search draft..."
                id="search-draft"
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>

            {/* check if not search and original data array 0 send a message */}
            {draft?.length === 0 && !search && (
              <div className="mt-[120px] flex w-full items-center justify-center">
                <p className="text-lg">Draft is empty</p>
              </div>
            )}

            {/* check if on search and results array 0 send a message */}
            {draft?.length === 0 && search && (
              <div className="mt-[120px] flex w-full items-center justify-center">
                <p className="text-lg">Result not found</p>
              </div>
            )}

            {/* item draft */}
            <ScrollArea className="h-screen w-full sm:h-96">
              <div className="mb-5 mt-2 divide-y">
                {draft?.map((item, i) => (
                  <React.Fragment key={i}>
                    <button
                      className={`flex w-full cursor-pointer items-center py-2 text-start hover:bg-blue-50 ${
                        item._id === query && "bg-blue-50"
                      }`}
                      onClick={() => handleDraft(item)}
                    >
                      <div className="px-4">
                        <p className="text-md line-clamp-1 capitalize">
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
