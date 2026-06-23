import type { Metadata } from "next";
import "./ui/globals.css";
import { IBM_Plex_Sans_Arabic } from 'next/font/google';

const ibmPlex = IBM_Plex_Sans_Arabic({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kalamboot.ir"),
  title: "Kalamboot",
  description: "Kalamboot is the Persian version of the Word Connections puzzle.",
  keywords: ["kalamboot", "کلمبوط", "بازی کلمات", "connections", "word game", "puzzle", "Persian", "Farsi"],
  icons: {
    icon: "favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://kalamboot.ir",
    siteName: "Kalamboot",
    title: "Kalamboot",
    description: "Kalamboot is the Persian version of the Word Connections puzzle.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa" dir="rtl" className={`${ibmPlex.className} flex justify-center items-center m-0 min-h-0 h-full w-full overflow-hidden`}>
      <body className="min-h-0 h-full flex flex-col justify-center items-center px-4 pt-4 md:p-6 lg:p-8 w-full md:w-[500] lg:w-[600]">
        {children}
      </body>
    </html>
  );
}
