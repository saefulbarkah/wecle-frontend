import { AuthorInfo } from "@/features/author";
import { AuthorMenus } from "@/features/author/components/author-menus";
import { AuthorService } from "@/services/author/author-service";
import React from "react";
export const dynamic = "force-dynamic";

export default async function AuthorPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const author = await AuthorService.find(id);
  return (
    <div className="mx-7 flex min-h-screen flex-col md:mx-[100px] md:flex-row">
      <div className="order-last flex-1 md:order-none md:pt-14">
        <h2 className="hidden text-4xl font-bold capitalize md:block">
          {author.name}
        </h2>
        <div className="md:mt-5">
          <AuthorMenus author={author} />
        </div>
      </div>
      <AuthorInfo author={author} />
    </div>
  );
}
