import type { Metadata } from "next";
import "./ui/globals.css";
import { IBM_Plex_Sans_Arabic } from 'next/font/google';

const ibmPlex = IBM_Plex_Sans_Arabic({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm',
});

export const metadata: Metadata = {
  title: "Kalamboot",
  description: "Kalamboot is the Persian version of the Word Connections puzzle.",
  icons: {
    icon: 'favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa" dir="rtl" className={`${ibmPlex.className} m-0 min-h-0 h-full w-full overflow-hidden antialiased selection:text-background selection:bg-primary`}>
      <body className="min-h-0 h-full w-full flex flex-col justify-center items-center px-4 pt-4 md:p-6 lg:p-8">{children}</body>
    </html>
  );
}
