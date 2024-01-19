"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent as Content,
} from "../ui/tabs";
import { TabsListProps, TabsTriggerProps } from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { create } from "zustand";

type State = {
  indicator: {
    width?: number;
    left?: number;
  };
};
type Action = {
  setIndicator: (val: State["indicator"]) => void;
};

const useUnderline = create<State & Action>((set) => ({
  indicator: {
    left: 0,
    width: 0,
  },
  setIndicator: (val) => set({ indicator: val }),
}));

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

const Indicator = () => {
  const [initialRender, setInitialRender] = useState(true);
  const state = useUnderline((state) => state.indicator);

  useEffect(() => setInitialRender(false), []);
  return (
    <span
      className="absolute bottom-0 block h-[2px] bg-black transition-all motion-reduce:transition-none dark:bg-white"
      style={
        initialRender ? undefined : { left: state.left, width: state.width }
      }
    />
  );
};

type itemProps = TabsTriggerProps & {
  label: string;
};
const Item = ({ label, className, ...props }: itemProps) => {
  const setIndicator = useUnderline((state) => state.setIndicator);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const isActive =
      triggerRef?.current?.getAttribute("data-state") === "active";
    const currentTab = triggerRef?.current;

    if (isActive && currentTab) {
      setIndicator({
        left: currentTab?.offsetLeft as number,
        width: currentTab?.clientWidth as number,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRef?.current?.getAttribute("data-state")]);

  return (
    <div>
      <TabsTrigger
        ref={triggerRef}
        className={cn(
          "text-md group relative h-full rounded p-2 text-secondary/80 transition-[opacity,color] data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none dark:text-white/40 dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white",
          className,
        )}
        {...props}
      >
        <p className="capitalize">{label}</p>
      </TabsTrigger>
      <Indicator />
    </div>
  );
};

export const TabUnderline = {
  Tabs,
  Lists,
  Item,
  Content,
};
