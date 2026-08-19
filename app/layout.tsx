import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Shellbound — Mortal Shell II Field Guide";
const description =
  "Master Mortal Shell II with spoiler-aware routes, Shell builds, weapon tactics, boss preparation, dungeon guidance, and launch-week field notes.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mortalshell2guide.org"),
  title,
  description,
  alternates: {
    canonical: "https://mortalshell2guide.org/",
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Shellbound",
    url: "https://mortalshell2guide.org/",
    images: [
      {
        url: "/og.png",
        width: 1672,
        height: 941,
        alt: "Shellbound Mortal Shell II Field Guide social preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="describedby" href="/llms.txt" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
