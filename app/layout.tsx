import type { Metadata } from "next";
import "./ui/globals.css";
import { IBM_Plex_Sans_Arabic } from 'next/font/google';

const ibmPlex = IBM_Plex_Sans_Arabic({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm',
});

export const metadata: Metadata = {
  title: "Parsi Connections",
  description: "Persian version of the Word Connections puzzle.",
  icons: {
    icon: '@/public/favicon.ico',
    apple: '@/public/apple-touch-icon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa" dir="rtl" className={`${ibmPlex.className} m-0 min-h-0 h-screen w-screen overflow-hidden antialiased`}>
      <body className="min-h-0 h-full w-full flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden">{children}</body>
    </html>
  );
}
