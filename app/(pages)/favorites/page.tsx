"use client";

import ProductCard from "@/app/components/cards/ProductCard";
import ContentAnimation from "@/app/components/ContentAnimation";
import { useFavorites } from "@/app/context/FavoritesContext";
import { HeartIcon } from "lucide-react";

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return (
      <div className="font-sans">
        <section className="flex flex-col gap-5 px-5 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-display font-bold text-xl text-ink">Favorites</h1>
            <div className="h-4 w-12 rounded bg-surface-hover animate-pulse" />
          </div>
          <ContentAnimation>
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="animate-pulse flex gap-4 bg-surface px-4 py-4 rounded-2xl">
                <div className="flex flex-col min-w-0 flex-1 justify-center gap-1">
                  <div className="h-5 rounded bg-surface-hover w-2/3" />
                  <div className="h-4 rounded bg-surface-hover w-full" />
                  <div className="h-4 rounded bg-surface-hover w-5/6" />
                  <div className="h-4 rounded bg-surface-hover w-12 mt-1" />
                </div>

                <div className="size-24 shrink-0 rounded-xl bg-surface-hover" />
              </div>
            ))}
          </ContentAnimation>
        </section>
      </div>
    );
  }

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
        <ContentAnimation>
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
        </ContentAnimation>
      </section>
    </div>
  );
}
