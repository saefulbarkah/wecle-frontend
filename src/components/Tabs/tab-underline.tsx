import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent as Content,
} from "../ui/tabs";
import { TabsListProps, TabsTriggerProps } from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

type listsProps = TabsListProps & {};
const Lists = ({ children, className, ...props }: listsProps) => {
  return (
    <TabsList
      className={cn(
        `relative flex w-full items-center justify-start rounded-none bg-white p-0`,
        className,
      )}
      {...props}
    >
      <div className="">
        <div className="relative flex w-full items-center justify-center space-x-2">
          {children}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black opacity-10 dark:bg-white" />
    </TabsList>
  );
};

type itemProps = TabsTriggerProps & {
  label: string;
};
const Item = ({ label, className, ...props }: itemProps) => {
  return (
    <TabsTrigger
      className={cn(
        "text-md group relative h-full rounded p-2 text-secondary/80 transition-[opacity,color] data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none dark:text-white/40 dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white",
        className,
      )}
      {...props}
    >
      <p className="capitalize">{label}</p>
      <div className="absolute bottom-0 h-[1px] w-full bg-black opacity-0 group-data-[state=active]:opacity-100 dark:bg-white"></div>
    </TabsTrigger>
  );
};

export const TabUnderline = {
  Tabs,
  Lists,
  Item,
  Content,
};
