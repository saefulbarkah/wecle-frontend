"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/auth/api/logout";
import { SessionType } from "@/hooks/sessions/type";
import { censorEmail } from "@/lib/utils";
import { Bookmark, Paperclip, SignalHigh, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const menuItems = [
  {
    name: "Pro`fil`e",
    icon: <User className="h-5 w-5" />,
    href: "/profile",
  },
  {
    name: "Library",
    icon: <Bookmark className="h-5 w-5" />,
    href: "#library",
  },
  {
    name: "Stories",
    icon: <Paperclip className="h-5 w-5" />,
    href: "#stories",
  },
  {
    name: "Stat",
    icon: <SignalHigh className="h-5 w-5" />,
    href: "#Stat",
  },
];

export const UserMenu = ({ session }: { session: SessionType }) => {
  const { mutate: logout } = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={session!.avatar as string}
          alt={session!.name as string}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[250px] px-0 py-0">
        <div className="my-2 flex flex-col">
          {menuItems.map((item, i) => (
            <Link
              href={item.href}
              key={i}
              className="bg-transparent text-secondary transition hover:bg-secondary/5 hover:text-black"
            >
              <div className="flex items-center gap-2 px-5 py-2">
                <span>{item.icon}</span>
                <span className="text-sm font-semibold">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
        <hr />
        <div className="my-2">
          <button
            className="mt-2 flex w-full flex-col items-start gap-2 px-5 text-sm"
            onClick={() => logout()}
          >
            <span>Sign out</span>
            <span className="text-xs">
              {censorEmail(session!.email as string)}
            </span>
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
