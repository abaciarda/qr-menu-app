import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import Footer from "./components/Footer";
import Navigation from "./components/navigation/Navigation";
import Sidebar from "./components/sidebar/Sidebar";
import CartSheet from "./components/cart/CartSheet";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { SidebarProvider } from "./context/SidebarContext";
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

export const metadata: Metadata = {
  title: "QR Menu — Scan & Order",
  description: "Browse our full menu, customize your order, and let your waiter know what you'd like.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased`}>
      <body className="bg-background text-ink min-h-screen flex flex-col">
        <SidebarProvider>
          <CartProvider>
            <FavoritesProvider>
              <Navigation />
              <Sidebar />
              <CartSheet />
              <div className="flex-1 font-sans">
                {children}
              </div>
              <Footer />
            </FavoritesProvider>
          </CartProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
