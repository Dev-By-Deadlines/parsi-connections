import type { Metadata } from "next";
import "./ui/globals.css";
import { IBM_Plex_Sans } from 'next/font/google';

const ibmPlex = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm',
});


export const metadata: Metadata = {
  title: "Parsi Connections",
  description: "Persian version of the Connections game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa" className={`${ibmPlex.variable} h-screen w-screen antialiased`}>
      <body className="min-h-0 h-full w-full flex flex-col">{children}</body>
    </html>
  );
}
