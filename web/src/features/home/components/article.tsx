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
      <div className="grid grid-cols-1 items-center">
        {data?.map((item) => (
          <article key={item._id} className="mt-4">
            <div className="flex items-center justify-between px-6 lg:px-10">
              <div className="mr-4 lg:mr-10">
                <Link
                  className="flex items-center gap-2"
                  href={'/author/' + item.author._id}
                >
                  <Avatar className="w-[30px] h-[30px]">
                    <Image
                      alt={item.author.name}
                      src={item.author.user.avatar}
                      fill
                      unoptimized
                    />
                  </Avatar>
                  <p className="font-semibold text-sm">{item.author.name}</p>
                </Link>
                <Link
                  href={`/article/${item.slug}`}
                  className="flex flex-col gap-1 mt-2"
                >
                  <h2 className="text-lg font-bold line-clamp-2">
                    {item.title}
                  </h2>
                  <div className="hidden lg:block">
                    <p className="line-clamp-3 text-md font-serif">
                      {limitText({ limit: 301, text: item.content })}
                    </p>
                  </div>
                </Link>
              </div>
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
            <div className="my-5 pl-6 lg:pl-10">
              <div className="h-[1px] w-full bg-secondary/20" />
            </div>
          </article>
        ))}
      </div>
    );
  }
);
Article.displayName = 'Article';

export default Article;
