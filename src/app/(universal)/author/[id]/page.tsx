import { TabUnderline } from "@/components/Tabs";
import { AuthorInfo } from "@/features/author";
import { HomeAuthor } from "@/features/author/components/home-author";
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
    <div className="mx-7 flex flex-col md:mx-[100px] md:flex-row">
      <div className="order-last flex-1 md:order-none md:pt-14">
        <h2 className="hidden text-4xl font-bold capitalize md:block">
          {author.name}
        </h2>
        <div className="md:mt-5">
          <TabUnderline.Tabs defaultValue="home">
            <TabUnderline.Lists className="sticky top-[60px] flex h-full w-full items-center">
              <TabUnderline.Item className="pt-5" value="home" label="home" />
              <TabUnderline.Item className="pt-5" value="about" label="about" />
            </TabUnderline.Lists>
            <div className="mt-5">
              <TabUnderline.Content value="about" className="pr-14">
                {author.about}
              </TabUnderline.Content>
              <TabUnderline.Content value="home" className="pr-14">
                <HomeAuthor authorId={author._id} />
              </TabUnderline.Content>
            </div>
          </TabUnderline.Tabs>
        </div>
      </div>
      <AuthorInfo author={author} />
    </div>
  );
}
