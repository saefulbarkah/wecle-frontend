'use client';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { useAtom } from 'jotai';
import React from 'react';
import { isUserHaveAccount, openAuthState } from '../store';
import LoginOverlay from './login-overlay';
import RegisterOverlay from './register-overlay';

export const AuthOverlay = () => {
  const [isOpen, setOpen] = useAtom(openAuthState);
  const [isMenuLogin, setMenuLogin] = useAtom(isUserHaveAccount);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setOpen(false);
        setTimeout(() => {
          setMenuLogin(true);
        }, 200);
      }}
    >
      <DialogOverlay className="bg-black/20" />
      <DialogContent className="min-h-screen min-w-full sm:min-h-[26rem] sm:min-w-[20rem]">
        {isMenuLogin ? <LoginOverlay /> : <RegisterOverlay />}
      </DialogContent>
    </Dialog>
  );
};
