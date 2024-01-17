"use client";

import React, { HTMLAttributes } from "react";
import { Editor, BubbleMenu as Menu } from "@tiptap/react";
import { BoldIcon, List, ListOrdered, Quote, Type } from "lucide-react";
import { cn } from "@/lib/utils";

export const BubbleMenu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return;
  return (
    <Menu
      editor={editor}
      tippyOptions={{ duration: 50 }}
      className="rounded bg-black/70 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 p-1.5">
        <Item
          onClick={() => editor.commands.toggleBold()}
          isActive={editor.isActive("bold")}
        >
          <BoldIcon />
        </Item>
        <Item
          onClick={() => editor.commands.toggleHeading({ level: 3 })}
          isActive={editor.isActive("heading", { level: 3 })}
        >
          <Type />
        </Item>
        <Item
          onClick={() => editor.commands.toggleBlockquote()}
          isActive={editor.isActive("blockquote")}
        >
          <Quote />
        </Item>
        <Item
          onClick={() => editor.commands.toggleBulletList()}
          isActive={editor.isActive("bulletList")}
        >
          <List />
        </Item>
        <Item
          onClick={() => editor.commands.toggleOrderedList()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered />
        </Item>
      </div>
    </Menu>
  );
};

interface itemProps extends HTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}
const Item = ({
  children,
  className,
  isActive = false,
  ...props
}: itemProps) => {
  return (
    <button
      className={cn(
        `rounded p-2 text-white hover:bg-white/10 ${isActive && "bg-white/10"}`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
