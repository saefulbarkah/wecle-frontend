"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent as Content,
} from "../ui/tabs";
import { TabsListProps, TabsTriggerProps } from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

type Context = {
  indicator: {
    left: number;
    width: number;
  };
  setIndicator: React.Dispatch<{ left: number; width: number }>;
};

const context = createContext<Context | null>(null);
const Provider = context.Provider;

type listsProps = TabsListProps & {
  bottomShadow?: boolean;
};
const Lists = ({
  children,
  className,
  bottomShadow = false,
  ...props
}: listsProps) => {
  const [indicator, setIndicator] = useState<Context["indicator"]>({
    left: 0,
    width: 0,
  });

  return (
    <Provider value={{ indicator, setIndicator }}>
      <TabsList
        className={cn(
          `relative flex w-full items-center justify-start rounded-none bg-white p-0`,
          className,
        )}
        {...props}
      >
        <div>
          <div className="relative flex w-full items-center justify-center">
            {children}
            <Indicator />
          </div>
        </div>
        {bottomShadow ? (
          <div className="dark:from-dark absolute bottom-0 h-[50px] w-full translate-y-full bg-gradient-to-b from-white"></div>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 z-10 h-[1px] bg-black opacity-10 dark:bg-white" />
      </TabsList>
    </Provider>
  );
};

const Indicator = () => {
  const [initialRender, setInitialRender] = useState(true);
  const { indicator } = useContext(context) as Context;

  useEffect(() => setInitialRender(false), []);
  return (
    <span
      className="absolute bottom-0 block h-[2px] bg-black transition-all motion-reduce:transition-none dark:bg-white"
      style={
        initialRender
          ? undefined
          : { left: indicator.left, width: indicator.width }
      }
    />
  );
};

type itemProps = TabsTriggerProps & {
  label: string;
};
const Item = ({ label, className, ...props }: itemProps) => {
  const { setIndicator } = useContext(context) as Context;

  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const currentTab = triggerRef?.current;
    const isActive =
      triggerRef?.current?.getAttribute("data-state") === "active";

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
          "text-md group relative h-full rounded text-secondary/80 transition-[opacity,color] data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none dark:text-white/40 dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white",
          className,
        )}
        {...props}
      >
        <p className="capitalize">{label}</p>
      </TabsTrigger>
    </div>
  );
};

export const TabUnderline = {
  Tabs,
  Lists,
  Item,
  Content,
};
