"use client";

import { TabUnderline } from "@/components/Tabs";
import React from "react";
import { HomeAuthor } from "./home-author";
import { author } from "@/types";

const menus = [
  {
    value: "home",
    label: "Home",
  },
  {
    value: "about",
    label: "About",
  },
];

export const AuthorMenus = ({ author }: { author: author }) => {
  const [activeMenu, setActiveMenu] = React.useState(menus[0].value);

  return (
    <div className="">
      <TabUnderline.Tabs
        defaultValue={activeMenu}
        onValueChange={setActiveMenu}
      >
        <TabUnderline.Lists className="sticky top-[60px] z-10 flex h-full w-full items-center">
          {menus.map((item, i) => (
            <TabUnderline.Item
              label={item.label}
              value={item.value}
              key={i}
              className="h-14"
            />
          ))}
        </TabUnderline.Lists>
        <div className="mt-5">
          <TabUnderline.Content value="about">
            {author.about}
          </TabUnderline.Content>
          <TabUnderline.Content value="home">
            <HomeAuthor authorId={author._id} />
          </TabUnderline.Content>
        </div>
      </TabUnderline.Tabs>
    </div>
  );
};
