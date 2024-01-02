"use client";

import { timeAgo } from "@/lib/time";
import { htmlToText, limitText } from "@/lib/utils";
import { ArticleType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface articleProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: ArticleType[];
}

export const ArticleAuthor = React.forwardRef<HTMLDivElement, articleProps>(
  ({ className, children, data, ...props }, ref) => {
    return (
      <>
        {data?.map((item, i) => (
          <article className="h-full w-full" key={i}>
            <div>
              <div className="mb-2">
                <time
                  dateTime={timeAgo(item.createdAt)}
                  aria-label="Date article created"
                  className="text-sm"
                >
                  {timeAgo(item.createdAt)}
                </time>
              </div>
              <Link
                href={`/article/${encodeURIComponent(item.slug)}`}
                className="flex w-full justify-between gap-2"
              >
                <div className="flex-1">
                  <h2 className="line-clamp-2 break-all text-[20px] font-bold">
                    {item.title}
                  </h2>
                  <div className="hidden justify-between gap-5 lg:mt-1 lg:flex">
                    <p className="text-md line-clamp-3 break-all font-serif">
                      {limitText({
                        limit: 301,
                        text: htmlToText(item.content),
                      })}
                    </p>
                  </div>
                </div>
                {item.cover && (
                  <Image
                    src={item.cover}
                    alt="testing"
                    width={0}
                    height={0}
                    quality={90}
                    className="ml-5 aspect-square h-[100px] w-[150px] object-cover lg:h-[134px] lg:w-[200px]"
                  />
                )}
              </Link>
            </div>
            <div className="py-10">
              <div className="h-[1px] w-full bg-secondary/10"></div>
            </div>
          </article>
        ))}
      </>
    );
  },
);
ArticleAuthor.displayName = "ArticleAuthor";
