"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface loadingProps extends React.PropsWithChildren {
  count: number;
}
export const LoadingArticle = ({ count, children }: loadingProps) => {
  return (
    <>
      {Array(count)
        .fill(null)
        .map((item, i) => (
          <div className="h-full w-full" key={i}>
            <div className="px-0 lg:pr-10">
              <div className="flex items-center gap-2">
                <Skeleton className="h-[32px] w-[30px] rounded-full" />
                <Skeleton className="h-3 w-32" />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex flex-col gap-2 lg:hidden">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                  <Skeleton className="hidden h-3 w-full lg:block" />
                  <div className="mt-5 hidden flex-col gap-3 lg:flex">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
                <Skeleton className="ml-5 h-[100px] w-[150px] lg:h-[134px] lg:w-[200px]" />
              </div>
            </div>
            <div className="py-10">
              <div className="h-[1px] w-full bg-secondary/10"></div>
            </div>
          </div>
        ))}
    </>
  );
};
