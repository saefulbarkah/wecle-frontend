"use client";
import React from "react";
import { ForYou } from "./for-you";
import { TabUnderline } from "@/components/Tabs";

const menus = [
  {
    value: "for-you",
    label: "For you",
  },
  {
    value: "trending",
    label: "Trending",
  },
];

export const ListArticle = () => {
  const [activeMenu, setActiveMenu] = React.useState(menus[0].value);

  return (
    <div className="min-h-screen lg:flex-1">
      <TabUnderline.Tabs
        defaultValue={activeMenu}
        onValueChange={setActiveMenu}
        className="mt-5"
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
        <div className="mt-10">
          <TabUnderline.Content value="for-you">
            <ForYou />
          </TabUnderline.Content>
          <TabUnderline.Content value="trending">
            On development....
          </TabUnderline.Content>
        </div>
      </TabUnderline.Tabs>
    </div>
  );
};
