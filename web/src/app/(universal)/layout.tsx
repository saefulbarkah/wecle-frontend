import { Navbar } from '@/components/navbar';
import { getServerSession } from '@/hooks/sessions/server';
import React from 'react';

export default async function UniversalLayout({
  children,
}: React.PropsWithChildren) {
  const session = await getServerSession();

  return (
    <>
      <Navbar session={session} />
      <div>{children}</div>
    </>
  );
}
