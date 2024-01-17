"use client";
import React from "react";
import { ThemeProvider as Provider } from "next-themes";

type Props = React.PropsWithChildren & {};

export function ThemeProvider({ children }: Props) {
  return (
    <Provider attribute="class" enableColorScheme={true}>
      {children}
    </Provider>
  );
}
