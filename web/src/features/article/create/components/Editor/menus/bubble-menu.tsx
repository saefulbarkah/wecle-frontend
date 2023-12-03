'use client';

import React, { HTMLAttributes } from 'react';
import { Editor, BubbleMenu as Menu } from '@tiptap/react';
import { BoldIcon, Type } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BubbleMenu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return;
  return (
    <Menu
      editor={editor}
      tippyOptions={{ duration: 50 }}
      className="bg-black/70 backdrop-blur-sm rounded"
    >
      <div className="flex items-center gap-2 p-1.5">
        <Item>
          <BoldIcon />
        </Item>
        <Item
          onClick={() => editor.commands.toggleHeading({ level: 3 })}
          isActive={editor.isActive('heading', { level: 3 })}
        >
          <Type />
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
        `p-2 text-white rounded hover:bg-white/10 ${isActive && 'bg-white/10'}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
