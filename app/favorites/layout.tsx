import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites",
  description: "View your saved menu items and favorite dishes.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function FavoritesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
