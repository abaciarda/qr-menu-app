"use client";

import { OptionGroup, RecommendedItem } from "@/app/data/categoryOptions";
import { createContext, useContext, useEffect, useState } from "react";

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
  isLoaded: boolean;
  toggle: (item: FavoriteItem) => void;
  isFavorite: (name: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;
const STORAGE_KEY = "user_favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if(storedData) {
      try {
        const { data, expiry } = JSON.parse(storedData);

        if (Date.now() < expiry) {
          setFavorites(data);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }

      } catch (error) {
        console.error("There has been an error while favorites data getting from the local storage.");
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if(isLoaded) {
      const expiry = Date.now() + TWO_WEEKS_MS;
      
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data: favorites, expiry })
      );
    }
  }, [ favorites, isLoaded ]);


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
    <FavoritesContext.Provider value={{ favorites, isLoaded, toggle, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside <FavoritesProvider>");
  return ctx;
}
