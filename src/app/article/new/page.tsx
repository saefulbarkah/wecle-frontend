import { CreateArticle, NavbarArticle } from '@/features/article/create';
import React from 'react';
import { getServerSession } from '@/hooks/sessions/server';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { description, keywords, title } from '@/lib/meta-data';

export const metadata: Metadata = {
  title: title + '- New story',
  keywords: keywords,
  description: description,
};

export default async function page() {
  const session = await getServerSession();
  if (!session) return redirect('/');
  return (
    <div>
      <NavbarArticle />
      <CreateArticle />
    </div>
  );
}
