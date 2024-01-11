import React from "react";
import { useAuthOverlay } from "../store/auth-overlay-store";
import { cn } from "@/lib/utils";

type T = React.HTMLAttributes<HTMLButtonElement> & {
  switchTo: "LOGIN" | "REGISTER";
};

export default function SwitchMenu({
  switchTo,
  children,
  className,
  ...props
}: T) {
  const authOverlay = useAuthOverlay((state) => state);
  return (
    <button
      onClick={() => {
        authOverlay.setMenu(switchTo);
      }}
      className={cn(`font-semibold  text-primary hover:underline`, className)}
      {...props}
    >
      {children}
    </button>
  );
}
