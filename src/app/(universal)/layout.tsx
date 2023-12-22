import { Navbar } from '@/components/navbar';
import React from 'react';

export default async function UniversalLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}
