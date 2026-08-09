"use client";

import ProductCard from "@/app/components/cards/ProductCard";
import { useFavorites } from "@/app/context/FavoritesContext";
import { HeartIcon } from "lucide-react";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-[60vh] text-ink-muted font-sans px-5">
        <HeartIcon size={48} strokeWidth={1.5} />
        <h1 className="font-display font-bold text-2xl text-ink">Favorites</h1>
        <p className="text-sm text-center leading-relaxed max-w-xs">
          Tap the heart on any product to save it here for easy reference.
        </p>
      </div>
    );
  }

  return (
    <div className="font-sans">
      <section className="flex flex-col gap-5 px-5 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-bold text-xl text-ink">Favorites</h1>
          <p className="text-sm text-ink-muted">{favorites.length} saved</p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {favorites.map((item) => (
            <ProductCard
              key={item.name}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              optionGroups={item.optionGroups}
              recommended={item.recommended}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
