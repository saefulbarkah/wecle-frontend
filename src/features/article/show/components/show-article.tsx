"use client";
import { articleServices } from "@/services/article";
import { ArticleType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Dot } from "lucide-react";
import Image from "next/image";
import React from "react";

export const ShowArticle = ({ data }: { data: ArticleType }) => {
  const { data: article } = useQuery({
    queryKey: ["article", data.slug],
    queryFn: () => articleServices.findArticle(data.slug),
    initialData: data,
  });

  return (
    <div>
      <h3 className="break-all font-serif text-[2rem] font-bold leading-snug sm:text-[2.5rem]">
        {article.title}
      </h3>
      <div className="my-10">
        <div className="flex items-center">
          <div className="relative h-12 w-12 rounded-full">
            <Image
              src={`https://ui-avatars.com/api/?name=Rezak`}
              alt={article.author.avatar}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="ml-3">
            <div className="flex items-center">
              <p className="ml-2 font-semibold">{article.author.name}</p>
              <Dot className="text-success" />
              <button className="text-sm font-semibold text-success">
                Follow
              </button>
            </div>
            <div className="flex items-center">
              <p className="ml-2 text-sm">10 nov 2023</p>
            </div>
          </div>
        </div>
      </div>
      {article.cover && (
        <Image
          src={article.cover}
          alt="testing"
          sizes="100vw"
          width={0}
          height={0}
          className="h-full w-full object-contain"
        />
      )}
      <article className="prose prose-lg sm:prose-xl">
        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="break-all"
        ></div>
      </article>
    </div>
  );
};
