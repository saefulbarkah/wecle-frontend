import type { Metadata } from 'next';
import { Quicksand, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { AuthOverlay } from '@/features/auth';
import QueryProvider from '@/providers/query-provider';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';
import { description, keywords, title } from '@/lib/meta-data';
import { CookiesProvider } from 'next-client-cookies/server';
import { getServerSession } from '@/hooks/sessions/server';

const quick = Quicksand({
  subsets: ['latin'],
  variable: '--quick-sand',
});

const sourceSerif = Source_Serif_4({
  variable: '--source-serif',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: keywords,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${quick.variable} ${sourceSerif.variable} font-sans`}>
        <CookiesProvider>
          <Toaster />
          <NextTopLoader />
          <QueryProvider>
            <Navbar session={session} />
            <AuthOverlay />
            <div>{children}</div>
          </QueryProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
