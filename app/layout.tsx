import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const defaultAppUrl = process.env.NEXT_PUBLIC_APP_URL || "https://qrmenu.app";

export const metadata: Metadata = {
  metadataBase: new URL(defaultAppUrl),
  title: {
    default: "QR Menu — Scan & Order",
    template: "%s | QR Menu",
  },
  description: "Browse our full digital restaurant menu, customize your items, and order directly from your table.",
  keywords: ["QR Menu", "Digital Restaurant Menu", "Online Menu", "Scan & Order", "Restaurant QR Code"],
  authors: [{ name: "QR Menu" }],
  creator: "QR Menu",
  publisher: "QR Menu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: defaultAppUrl,
    title: "QR Menu — Scan & Order",
    description: "Browse our full digital restaurant menu, customize your items, and order directly from your table.",
    siteName: "QR Menu",
    images: [
      {
        url: "/images/categories/burger.png",
        width: 1200,
        height: 630,
        alt: "QR Menu Digital Restaurant Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Menu — Scan & Order",
    description: "Browse our full digital restaurant menu, customize your items, and order directly from your table.",
    images: ["/images/categories/burger.png"],
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
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased`}>
      <body className="bg-ui-background text-ui-ink min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
