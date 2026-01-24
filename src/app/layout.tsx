import type { Metadata } from "next";
import { Marmelad } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/structured-data";
import { Analytics } from "@vercel/analytics/next";

const marmelad = Marmelad({
  variable: "--font-marmelad",
  subsets: ["latin"],
  weight: ["400"],
});

// Add custom fonts via Google Fonts CDN for WindSong, Righteous, and Palanquin Dark
const customFonts = `
  @import url('https://fonts.googleapis.com/css2?family=WindSong:wght@400;500&family=Righteous&family=Palanquin+Dark:wght@400;500;600;700&display=swap');
`;

export const metadata: Metadata = {
  title: {
    default: "Ami Shalom - Your Travel Experience",
    template: "%s | Ami Shalom Travel",
  },
  description:
    "Expert guided tours, exclusive destinations, and unforgettable adventures await.",
  keywords: [
    "travel guide",
    "adventure travel",
    "guided tours",
    "family vacation",
    "Ami Shalom travel",
  ],
  authors: [{ name: "Ami Shalom Travel" }],
  creator: "Ami Shalom Travel",
  publisher: "Ami Shalom Travel",
  metadataBase: new URL("https://AmiShalom.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://AmiShalom.vercel.app",
    title: "Ami Shalom - Your Travel Experience",
    description:
      "Expert guided tours, exclusive destinations, and unforgettable adventures await.",
    siteName: "Ami Shalom Travel",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ami Shalom Travel - Explore Ami Shalom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ami Shalom - Your Travel Experience",
    description:
      "Expert guided tours, exclusive destinations, and unforgettable adventures await.",
    images: ["/og-image.png"],
    creator: "@Ami Shalomtravel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: customFonts }} />
        <link
          rel="preload"
          as="video"
          href="/assets/Beauty is Africa.mp4"
          type="video/mp4"
        />
      </head>
      <body className={`${marmelad.variable} antialiased`}>
        <StructuredData />
        {children}
      </body>
      <Analytics />
    </html>
  );
}
