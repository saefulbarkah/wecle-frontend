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
        `relative flex w-full items-center justify-start bg-white p-0`,
        className,
      )}
      {...props}
    >
      <div className="">
        <div className="relative flex w-full items-center justify-center gap-5">
          {children}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black opacity-10" />
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
        "text-md group relative h-full px-0 py-0 pb-3 data-[state=active]:shadow-none",
        className,
      )}
      {...props}
    >
      <p className="capitalize">{label}</p>
      <div className="absolute bottom-0 h-[1px] w-full translate-y-[1px] bg-black opacity-0 group-data-[state=active]:opacity-100"></div>
    </TabsTrigger>
  );
};

export const TabUnderline = {
  Tabs,
  Lists,
  Item,
  Content,
};
