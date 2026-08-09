"use client";

import { OptionGroup, RecommendedItem } from "@/app/data/categoryOptions";
import { createContext, useContext, useState } from "react";

export type FavoriteItem = {
  name: string;
  description: string;
  price: number;
  image: string;
  optionGroups: OptionGroup[];
  recommended: RecommendedItem[];
};

type FavoritesContextValue = {
  favorites: FavoriteItem[];
  toggle: (item: FavoriteItem) => void;
  isFavorite: (name: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  function toggle(item: FavoriteItem) {
    setFavorites((prev) =>
      prev.some((f) => f.name === item.name)
        ? prev.filter((f) => f.name !== item.name)
        : [...prev, item]
    );
  }

  function isFavorite(name: string) {
    return favorites.some((f) => f.name === name);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside <FavoritesProvider>");
  return ctx;
}
