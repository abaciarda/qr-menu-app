"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { OptionGroup, RecommendedItem } from "@/types/category";
import ProductPopup from "./ProductPopup";
import { useLanguage } from "@/lib/i18n/context";

type ProductCardProps = {
  name: string;
  description: string;
  price: number;
  image: string;
  optionGroups?: OptionGroup[];
  recommended?: RecommendedItem[];
};

const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY3Ii8+PC9zdmc+";

function getNextImageUrl(src: string, width = 828, quality = 75): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

export default function ProductCard({
  name = "Burger",
  description = "",
  price = 0,
  image = "",
  optionGroups = [],
  recommended = [],
}: Partial<ProductCardProps>) {
  const [open, setOpen] = useState(false);
  const { getLocalized } = useLanguage();
  const preloaded = useRef(false);

  const localizedName = getLocalized(name);
  const localizedDesc = getLocalized(description);

  const preloadImage = useCallback(() => {
    if (preloaded.current || !image) return;
    preloaded.current = true;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = getNextImageUrl(image);
    document.head.appendChild(link);
  }, [image]);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        onMouseEnter={preloadImage}
        onTouchStart={preloadImage}
        className="flex gap-4 bg-ui-surface px-4 py-4 rounded-2xl cursor-pointer hoverable-btn"
      >
        <div className="flex flex-col min-w-0 flex-1 justify-center gap-1">
          <p className="font-display font-semibold text-ui-ink truncate">{localizedName}</p>
          <p className="text-ui-ink-muted text-sm line-clamp-2">{localizedDesc}</p>
          <p className="font-mono text-ui-ink font-semibold text-sm mt-1">
            ${price.toFixed(2)}
          </p>
        </div>

        <div className="size-24 shrink-0 relative rounded-xl overflow-hidden bg-ui-surface">
          <Image
            src={image}
            alt={localizedName}
            fill
            sizes="96px"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        </div>
      </div>

      <ProductPopup
        name={name}
        description={description}
        price={price}
        image={image}
        optionGroups={optionGroups}
        recommended={recommended}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}