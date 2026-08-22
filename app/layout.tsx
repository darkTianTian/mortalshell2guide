import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteFooter from "./components/SiteFooter";
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
const googleAnalyticsId = "G-BDWC6HJWKB";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#080807",
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
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        />
        <script
          id="google-analytics-config"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
