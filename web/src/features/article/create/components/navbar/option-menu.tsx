'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Archive, MoreVertical } from 'lucide-react';
import React from 'react';

const CustomDropdownItem = ({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) => {
  return (
    <>
      <DropdownMenuItem className="focus:bg-secondary/5">
        <i className="mr-3 text-sm">{icon}</i>
        <span className="text-secondary font-semibold">{label}</span>
      </DropdownMenuItem>
    </>
  );
};

export const OptionMenu = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="translate-y-2 w-56">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <CustomDropdownItem icon={<Archive size={20} />} label="Archive" />
          <CustomDropdownItem icon={<Archive size={20} />} label="Archive" />
          <CustomDropdownItem icon={<Archive size={20} />} label="Archive" />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
