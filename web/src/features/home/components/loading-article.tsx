'use client';

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface loadingProps extends React.PropsWithChildren {
  count: number;
}
export const LoadingArticle = ({ count, children }: loadingProps) => {
  return (
    <>
      {Array(count)
        .fill(null)
        .map((item) => (
          <div className="w-full h-full" key={item}>
            <div className="px-5 lg:px-10">
              <div className="flex items-center gap-2">
                <Skeleton className="h-[30px] w-[30px] rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="flex items-center gap-2 mt-5">
                <div className="w-full mr-10">
                  <Skeleton className="h-4 w-full" />
                  <div className="mt-5 flex flex-col gap-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
                <Skeleton className="w-[80px] h-[56px] lg:h-[112px] lg:w-[112px]" />
              </div>
            </div>
            <div className="py-10">
              <div className="bg-secondary/10 w-full h-[1px]"></div>
            </div>
          </div>
        ))}
    </>
  );
};
