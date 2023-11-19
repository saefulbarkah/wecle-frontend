'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LucidePlus } from 'lucide-react';
import React from 'react';
import { ForYou } from './for-you';

const menus = [
  {
    value: 'for-you',
    label: 'For you',
  },
  {
    value: 'trending',
    label: 'Trending',
  },
];

export const ListArticle = () => {
  const [activeMenu, setActiveMenu] = React.useState(menus[0].value);

  return (
    <div className="flex-1 px-10">
      <Tabs defaultValue={activeMenu} onValueChange={setActiveMenu}>
        <TabsList className="bg-white flex items-center justify-start h-[50px] p-0 sticky w-full z-40 top-[60px]">
          <div className="mt-[20px] flex items-center justify-start gap-5 w-full relative">
            <button className="pb-3">
              <LucidePlus
                size={18}
                className="transition text-secondary hover:text-black"
              />
            </button>
            {menus.map((item, i) => (
              <React.Fragment key={i}>
                <TabsTrigger
                  value={item.value}
                  className="group data-[state=active]:shadow-none relative h-full px-0 py-0 text-md pb-3"
                >
                  {item.label}
                  <div className="absolute bg-black h-[1px] w-full bottom-0 opacity-0 group-data-[state=active]:opacity-100"></div>
                </TabsTrigger>
              </React.Fragment>
            ))}
            <div className="absolute w-full h-[1px] bg-black bottom-0 opacity-10"></div>
          </div>
        </TabsList>
        <div className="mt-5">
          <TabsContent value={'for-you'} className="min-h-[calc(100vh-140px)]">
            <ForYou />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
