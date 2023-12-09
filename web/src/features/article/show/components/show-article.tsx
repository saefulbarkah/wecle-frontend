'use client';
import { findArticle } from '@/services/article';
import { ArticleType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Dot } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export const ShowArticle = ({ data }: { data: ArticleType }) => {
  const { data: article } = useQuery({
    queryKey: ['article', data.slug],
    queryFn: () => findArticle(data.slug),
    initialData: data,
  });

  return (
    <div>
      <h3 className="font-serif text-[2rem] sm:text-[2.5rem] font-bold leading-snug">
        {article.title}
      </h3>
      <div className="my-10">
        <div className="flex items-center">
          <div className="relative w-12 h-12 rounded-full">
            <Image
              src={`https://ui-avatars.com/api/?name=Rezak`}
              alt={article.author.avatar}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <div className="ml-3">
            <div className="flex items-center">
              <p className="font-semibold ml-2">{article.author.name}</p>
              <Dot className="text-success" />
              <button className="text-sm text-success font-semibold">
                Follow
              </button>
            </div>
            <div className="flex items-center">
              <p className="ml-2 text-sm">10 nov 2023</p>
            </div>
          </div>
        </div>
      </div>
      <article className="prose prose-lg sm:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
      </article>
    </div>
  );
};
