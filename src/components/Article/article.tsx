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
          <article className="h-full w-full" key={i}>
            <div className="px-5 lg:px-10">
              <Link
                className="flex items-center gap-2"
                href={"/author/" + item.author._id}
              >
                <Avatar className="h-[30px] w-[30px]">
                  <Image
                    alt={`avatar`}
                    src={`${item.author.avatar}`}
                    fill
                    unoptimized
                  />
                </Avatar>
                <p className="text-sm font-semibold">{item.author.name}</p>
              </Link>
              <div className="mt-5 flex items-center gap-2">
                <Link
                  href={`/article/${encodeURIComponent(item.slug)}`}
                  className="mr-10 w-full"
                >
                  <h2 className="line-clamp-2 text-lg font-bold">
                    {item.title}
                  </h2>
                  <div className="mt-5 hidden flex-col gap-3 lg:flex">
                    <p className="text-md line-clamp-3 font-serif">
                      {limitText({
                        limit: 301,
                        text: htmlToText(item.content),
                      })}
                    </p>
                  </div>
                </Link>
                <Image
                  src={"https://picsum.photos/1280/720"}
                  alt="testing"
                  sizes="100vw"
                  width={0}
                  height={0}
                  priority
                  className="h-[56px] w-[80px] border object-cover lg:h-[112px] lg:w-[112px]"
                />
              </div>
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
Article.displayName = "Article";

export default Article;
