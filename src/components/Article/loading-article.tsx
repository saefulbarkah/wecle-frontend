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
                <Skeleton className="h-[30px] w-[30px] rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="mt-5 flex items-center gap-2">
                <div className="mr-10 w-full">
                  <Skeleton className="h-4 w-full" />
                  <div className="mt-5 flex flex-col gap-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
                <Skeleton className="h-[56px] w-[80px] lg:h-[134px] lg:w-[200px]" />
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
