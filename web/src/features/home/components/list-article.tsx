'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LucidePlus } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';
import { ForYou } from './for-you';
import { TabsContentProps } from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

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

const Content = ({ children, value, className }: TabsContentProps) => {
  return (
    <div className="mt-10">
      <TabsContent
        value={value}
        className={cn('min-h-[calc(100vh-140px)]', className)}
      >
        {children}
        <ForYou />
      </TabsContent>
    </div>
  );
};

export const ListArticle = () => {
  const [activeMenu, setActiveMenu] = React.useState(menus[0].value);

  return (
    <div className="lg:flex-1">
      <Tabs defaultValue={activeMenu} onValueChange={setActiveMenu}>
        <TabsList className="bg-white flex items-center justify-center lg:justify-start h-[60px] p-0 sticky w-full z-40 top-[62px]">
          <div className="mt-[20px] lg:px-10">
            <div className="flex items-center justify-center gap-5 w-full relative">
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
                    <div className="absolute bg-black h-[1px] w-full bottom-0 translate-y-[1px] opacity-0 group-data-[state=active]:opacity-100"></div>
                  </TabsTrigger>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 h-[1px] bg-black bottom-0 opacity-10 lg:ml-10" />
        </TabsList>
        <Content value="for-you">
          <ForYou />
        </Content>
      </Tabs>
    </div>
  );
};
