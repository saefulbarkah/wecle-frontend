'use client';

import { Avatar } from '@/components/ui/avatar';
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
      <div className="flex flex-col gap-[27px]">
        {data?.map((item) => {
          return (
            <React.Fragment key={item._id}>
              <div className="flex">
                <div>
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
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <p className="line-clamp-3 text-md font-serif">
                      {item.content}
                    </p>
                  </Link>
                </div>
              </div>
              <div className="h-[1px] w-full bg-secondary/20" />
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);
Article.displayName = 'Article';

export default Article;
