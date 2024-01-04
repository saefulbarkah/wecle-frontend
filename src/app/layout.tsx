import type { Metadata } from "next";
import { Open_Sans, Quicksand } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { description, keywords, metadataBase, title } from "@/lib/meta-data";
import { getServerSession } from "@/hooks/sessions/server";
import AuthProvider from "@/providers/auth-provider";
import { CreatePortal } from "@/components/create-portal";
import { AuthOverlay } from "@/features/auth";
import Script from "next/script";

const quick = Quicksand({
  subsets: ["latin"],
  variable: "--quick-sand",
});

// const sourceSerif = Source_Serif_4({
//   variable: '--source-serif',
//   subsets: ['latin'],
// });

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--source-serif",
});

export const metadata: Metadata = {
  metadataBase: metadataBase,
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
      <body className={`${quick.variable} ${openSans.variable} font-sans`}>
        <AuthProvider session={session}>
          <CreatePortal>
            <Toaster />
          </CreatePortal>
          <NextTopLoader />
          <QueryProvider>
            <AuthOverlay />
            {children}
          </QueryProvider>
        </AuthProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-97BGHVCZ7P" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-97BGHVCZ7P');
            `}
        </Script>
      </body>
    </html>
  );
}
