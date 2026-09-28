"use client";

import ProductCard from "@/app/components/cards/ProductCard";
import ProductPopup from "@/app/components/cards/ProductPopup";
import ContentAnimation from "@/app/components/ContentAnimation";
import { OptionGroupDTO, ProductDTO, RecommendedItemDTO } from "@/types/category";
import { useState } from "react";

interface ProductListWithPopupProps {
  products: ProductDTO[];
  optionGroups: OptionGroupDTO[];
  recommended: RecommendedItemDTO[];
}

const EMPTY_OPTION_GROUPS: OptionGroupDTO[] = [];
const EMPTY_RECOMMENDED: RecommendedItemDTO[] = [];

export default function ProductListWithPopup({
  products,
  optionGroups,
  recommended,
}: ProductListWithPopupProps) {
  const [selected, setSelected] = useState<ProductDTO | null>(null);

  return (
    <>
      <ContentAnimation>
        {products.map((product) => (
          <ProductCard
            key={product.name}
            {...product}
            optionGroups={optionGroups}
            recommended={recommended}
            onSelect={() => setSelected(product)}
          />
        ))}
      </ContentAnimation>

      <ProductPopup
        name={selected?.name ?? ""}
        description={selected?.description ?? ""}
        price={selected?.price ?? 0}
        image={selected?.image ?? ""}
        optionGroups={selected ? optionGroups : EMPTY_OPTION_GROUPS}
        recommended={selected ? recommended : EMPTY_RECOMMENDED}
        open={selected !== null}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
