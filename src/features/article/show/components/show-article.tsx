"use client";
import { articleServices } from "@/services/article";
import { ArticleType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Dot, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export const ShowArticle = ({ data }: { data: ArticleType }) => {
  const [isImgLoaded, setLoadedImage] = useState(false);
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
          <Image
            src={`https://ui-avatars.com/api/?name=Rezak`}
            alt={article.author.avatar}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
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
        <div className="relative aspect-video overflow-hidden">
          {!isImgLoaded ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loader2 className="flex h-8 w-8 animate-spin lg:h-12 lg:w-12" />
            </div>
          ) : null}
          <Image
            src={article.cover.src}
            alt="testing"
            fill
            sizes="100%"
            className="object-contain"
            onLoad={() => {
              setLoadedImage(true);
            }}
          />
        </div>
      )}
      <article className="prose prose-lg dark:prose-invert sm:prose-xl">
        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="break-all"
        ></div>
      </article>
    </div>
  );
};
