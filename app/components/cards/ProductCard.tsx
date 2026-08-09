"use client";

import Image from "next/image";
import { useState } from "react";
import { OptionGroup, RecommendedItem } from "@/app/data/categoryOptions";
import ProductPopup from "./ProductPopup";

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

export default function ProductCard({
  name = "Egg Buster",
  description = "150gr Beef Burger, Egg, Cheese, Lettuce, Tomato, Onion, Pickles, Mayo",
  price = 13.2,
  image = "/images/food/beefburger.jpg",
  optionGroups = [],
  recommended = [],
}: Partial<ProductCardProps>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden" aria-hidden="true">
        <Image src={image} alt="" width={448} height={256} priority />
      </div>

      <div
        onClick={() => setOpen(true)}
        className="flex gap-4 bg-surface px-4 py-4 rounded-2xl cursor-pointer hoverable-btn"
      >
        <div className="flex flex-col min-w-0 flex-1 justify-center gap-1">
          <p className="font-display font-semibold text-ink truncate">{name}</p>
          <p className="text-ink-muted text-sm line-clamp-2">{description}</p>
          <p className="font-mono text-ink font-semibold text-sm mt-1">
            ${price.toFixed(2)}
          </p>
        </div>

        <div className="size-24 shrink-0 relative rounded-xl overflow-hidden bg-surface">
          <Image
            src={image}
            alt={name}
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