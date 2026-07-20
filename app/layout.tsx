import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

// Display face — used with restraint, headlines only.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
  display: "swap",
});

// Body face — clean, high legibility.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Utility face — mono, evokes drop codes / style numbers from streetwear tagging.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://midecollectives.com"),
  title: {
    default: "Mide Collectives — Built for the Street",
    template: "%s | Mide Collectives",
  },
  description:
    "Mide Collectives is a modern streetwear house crafting limited-run essentials at the intersection of luxury and the street. Shop the current collection.",
  keywords: [
    "Mide Collectives",
    "streetwear",
    "luxury streetwear",
    "premium streetwear brand",
    "limited drop",
  ],
  openGraph: {
    title: "Mide Collectives — Built for the Street",
    description:
      "A modern streetwear house crafting limited-run essentials at the intersection of luxury and the street.",
    url: "https://midecollectives.com",
    siteName: "Mide Collectives",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mide Collectives — Built for the Street",
    description:
      "A modern streetwear house crafting limited-run essentials at the intersection of luxury and the street.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
