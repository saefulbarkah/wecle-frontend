'use client';

import { Avatar } from '@/components/ui/avatar';
import { limitText } from '@/lib/utils';
import { ArticleType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface articleProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: ArticleType[];
}

const Article = React.forwardRef<HTMLDivElement, articleProps>(
  ({ className, children, data, ...props }, ref) => {
    return (
      <>
        {data?.map((item, i) => (
          <article className="w-full h-full" key={i}>
            <div className="px-5 lg:px-10">
              <Link
                className="flex items-center gap-2"
                href={'/author/' + item.author._id}
              >
                <Avatar className="w-[30px] h-[30px]">
                  <Image
                    alt={item.author.name}
                    src={`${item.author.avatar}`}
                    fill
                    unoptimized
                  />
                </Avatar>
                <p className="font-semibold text-sm">{item.author.name}</p>
              </Link>
              <div className="flex items-center gap-2 mt-5">
                <Link href={`/article/${item.slug}`} className="w-full mr-10">
                  <h2 className="text-lg font-bold line-clamp-2">
                    {item.title}
                  </h2>
                  <div className="hidden mt-5 lg:flex flex-col gap-3">
                    <p className="line-clamp-3 text-md font-serif">
                      {limitText({ limit: 301, text: item.content })}
                    </p>
                  </div>
                </Link>
                <Image
                  src={'https://picsum.photos/1280/720'}
                  unoptimized
                  alt="testing"
                  sizes="100vw"
                  width={300}
                  height={300}
                  className="w-[80px] h-[56px] lg:h-[112px] lg:w-[112px] object-cover border"
                />
              </div>
            </div>
            <div className="py-10">
              <div className="bg-secondary/10 w-full h-[1px]"></div>
            </div>
          </article>
        ))}
      </>
    );
  }
);
Article.displayName = 'Article';

export default Article;
