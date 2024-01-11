"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Monitor, Moon, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const menus = [
  {
    name: "Light",
    value: "light",
    icon: <Sun className="mr-2 h-5 w-5 " />,
  },
  {
    name: "Dark",
    value: "dark",
    icon: <Moon className="mr-2 h-5 w-5 " />,
  },
  {
    name: "System",
    value: "system",
    icon: <Monitor className="mr-2 h-5 w-5 " />,
  },
];

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="dark:text-foreground-dark text-secondary transition hover:text-black"
        >
          <MoonStar />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[10rem] px-0"
        sideOffset={20}
        alignOffset={-100}
        align="start"
      >
        <div className="px-1">
          <DropdownMenuLabel>Themes</DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator />

        {menus.map((item, i) => (
          <DropdownMenuItem
            className={`cursor-pointer text-secondary transition-[opacity,color] ${
              theme === item.value
                ? "dark:bg-dark-hover bg-slate-100 text-black dark:text-white"
                : ""
            }`}
            key={i}
            onClick={() => setTheme(item.value)}
          >
            <div className="flex items-center px-1">
              {item.icon}
              <span className="font-semibold">{item.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
