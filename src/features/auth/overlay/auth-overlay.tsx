'use client';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import React from 'react';
import LoginOverlay from './login-overlay';
import RegisterOverlay from './register-overlay';
import { useAuthOverlay, useMenuAuth } from '../store';

export const AuthOverlay = () => {
  const menu = useMenuAuth((state) => state.menu);
  const setMenu = useMenuAuth((state) => state.setMenu);
  const setOverlayAuth = useAuthOverlay((state) => state.setOpen);
  const openOverlayAuth = useAuthOverlay((state) => state.isOpen);

  return (
    <Dialog
      open={openOverlayAuth}
      onOpenChange={() => {
        setOverlayAuth(false);
        setTimeout(() => {
          setMenu('LOGIN');
        }, 200);
      }}
    >
      <DialogOverlay className="bg-black/20" />
      <DialogContent className="min-h-screen min-w-full sm:min-h-[26rem] sm:min-w-[20rem]">
        {menu === 'LOGIN' ? <LoginOverlay /> : <RegisterOverlay />}
      </DialogContent>
    </Dialog>
  );
};
