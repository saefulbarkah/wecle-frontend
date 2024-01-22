"use client";

import { Avatar } from "@/components/ui/avatar";
import { htmlToText, limitText } from "@/lib/utils";
import { ArticleType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface articleProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: ArticleType[];
}

const Article = React.forwardRef<HTMLDivElement, articleProps>(
  ({ className, children, data, ...props }, ref) => {
    return (
      <>
        {data?.map((item, i) => (
          <article className="h-full w-full" key={i} ref={ref}>
            <div className="lg:pr-10">
              <Link
                className="flex items-center gap-2"
                href={"/author/" + item.author._id}
                prefetch={false}
              >
                <Image
                  alt={`avatar`}
                  src={`${item.author.avatar}`}
                  height={30}
                  width={30}
                  className="rounded-full"
                />
                <p className="text-sm font-semibold">{item.author.name}</p>
              </Link>
              <div className="lg:mt-5">
                <Link
                  href={`/article/${encodeURIComponent(item.slug)}`}
                  className="flex w-full justify-between gap-2"
                  prefetch={false}
                >
                  {/* desktop view */}
                  <div className="hidden flex-1 lg:block">
                    <h2 className="line-clamp-2 break-all text-sm font-bold md:text-[20px]">
                      {item.title}
                    </h2>
                    <div className="mt-2 justify-between gap-5 lg:flex">
                      <p className="text-md line-clamp-3 break-all font-serif">
                        {limitText({
                          limit: 301,
                          text: htmlToText(item.content),
                        })}
                      </p>
                    </div>
                  </div>

                  {/* mobile view */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <h2 className="line-clamp-2 break-all text-base font-bold">
                      {item.title}
                    </h2>
                  </div>
                  {item.cover && (
                    <div className="relative ml-5 h-[100px] w-[120px] lg:h-[134px] lg:w-[200px]">
                      <Image
                        src={item.cover.src}
                        alt="testing"
                        fill
                        placeholder="empty"
                        blurDataURL={`/no-images.webp`}
                        quality={50}
                        priority
                        sizes="100%"
                        className="h-full w-full object-scale-down"
                      />
                    </div>
                  )}
                </Link>
              </div>
            </div>
            <div className="py-3 lg:py-10">
              <div className="h-[1px] w-full bg-secondary/10"></div>
            </div>
          </article>
        ))}
      </>
    );
  },
);
Article.displayName = "Article";

export default Article;
