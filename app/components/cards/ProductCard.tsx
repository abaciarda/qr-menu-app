"use client";

import { useLanguage } from "@/lib/i18n/context";
import { OptionGroup, RecommendedItem } from "@/types/category";
import NextImage from "next/image";
import { useState, useCallback } from "react";

export type ProductCardProps = {
  name: string;
  description: string;
  price: number;
  image: string;
  optionGroups?: OptionGroup[];
  recommended?: RecommendedItem[];
  index?: number;
  onSelect?: () => void;
};

const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY3Ii8+PC9zdmc+";

export default function ProductCard({
  name = "Burger",
  description = "",
  price = 0,
  image = "",
  index = 99,
  onSelect,
}: Partial<ProductCardProps>) {
  const { getLocalized } = useLanguage();
  const [preloaded, setPreloaded] = useState(false);

  const localizedName = getLocalized(name ?? "");
  const localizedDesc = getLocalized(description ?? "");

  const isAboveFold = index < 3;

  const preloadImage = useCallback(() => {
    if (preloaded || !image) return;
    setPreloaded(true);
    const img = new Image();
    img.src = image;
  }, [image, preloaded]);

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={preloadImage}
      onTouchStart={preloadImage}
      className="w-full text-left flex gap-4 bg-ui-surface px-4 py-4 rounded-2xl cursor-pointer hoverable-btn active:scale-[0.98] transition-transform duration-100 touch-manipulation select-none"
    >
      <div className="flex flex-col min-w-0 flex-1 justify-center gap-1">
        <p className="font-display font-semibold text-ui-ink truncate">{localizedName}</p>
        <p className="text-ui-ink-muted text-sm line-clamp-2">{localizedDesc}</p>
        <p className="font-mono text-ui-ink font-semibold text-sm mt-1">
          ${price.toFixed(2)}
        </p>
      </div>

      <div className="size-24 shrink-0 relative rounded-xl overflow-hidden bg-ui-surface pointer-events-none">
        <NextImage
          src={image}
          alt={localizedName}
          fill
          sizes="96px"
          priority={isAboveFold}
          loading={isAboveFold ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover"
        />
      </div>
    </button>
  );
}