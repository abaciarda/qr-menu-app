"use client";

import CategorySlideView from "@/app/components/cards/CategorySlideView";
import ProductCard from "@/app/components/cards/ProductCard";
import ProductPopup from "@/app/components/cards/ProductPopup";
import CategoryHeader from "@/app/components/CategoryHeader";
import ContentAnimation from "@/app/components/ContentAnimation";
import { CategoryPageDTO, ProductDTO } from "@/types/category";
import { useState } from "react";

interface CategoryPageViewProps {
  categoryData: CategoryPageDTO;
}

const EMPTY_OPTION_GROUPS: CategoryPageDTO["optionGroups"] = [];
const EMPTY_RECOMMENDED: CategoryPageDTO["recommended"] = [];

export default function CategoryPageView({ categoryData }: CategoryPageViewProps) {
  const { name, products, optionGroups, recommended } = categoryData;

  const [selected, setSelected] = useState<ProductDTO | null>(null);

  return (
    <div className="h-full">
      <CategorySlideView />
      <section className="flex flex-col gap-5 px-5 py-4 max-w-7xl mx-auto w-full">
        <CategoryHeader title={name} count={products.length} />
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
      </section>

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
    </div>
  );
}
