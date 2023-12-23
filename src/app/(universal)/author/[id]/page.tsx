import { TabUnderline } from "@/components/Tabs";
import { AuthorInfo } from "@/features/author";
import { HomeAuthor } from "@/features/author/components/home-author";
import { AuthorService } from "@/services/author/author-service";
import React from "react";

export default async function AuthorPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const author = await AuthorService.find(id);
  return (
    <div className="mx-[100px] flex">
      <div className="flex-1 pt-14">
        <h2 className="text-4xl font-bold capitalize">{author.name}</h2>
        <div className="mt-12">
          <TabUnderline.Tabs defaultValue="home">
            <TabUnderline.Lists>
              <TabUnderline.Item value="home" label="home" />
              <TabUnderline.Item value="about" label="about" />
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
      <AuthorInfo data={author} />
    </div>
  );
}
