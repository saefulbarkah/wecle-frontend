"use client";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import React from "react";
import Login from "./Login";
import { useAuthOverlay } from "../store/auth-overlay-store";
import { Register } from "./Register";

export const AuthOverlay = () => {
  const overlayState = useAuthOverlay((state) => state);
  return (
    <Dialog open={overlayState.isOpen} onOpenChange={overlayState.setOpen}>
      <DialogOverlay className="hidden bg-secondary/20 md:block" />
      <DialogContent className="h-full  max-w-full transition-transform md:h-[unset] md:max-w-md lg:max-w-md">
        {overlayState.menu === "LOGIN" && <Login />}
        {overlayState.menu === "REGISTER" && <Register />}
      </DialogContent>
    </Dialog>
  );
};
