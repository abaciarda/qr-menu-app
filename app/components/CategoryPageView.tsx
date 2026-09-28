import CategorySlideView from "@/app/components/cards/CategorySlideView";
import CategoryHeader from "@/app/components/CategoryHeader";
import ProductListWithPopup from "@/app/components/ProductListWithPopup";
import { CategoryPageDTO } from "@/types/category";

interface CategoryPageViewProps {
  categoryData: CategoryPageDTO;
}

export default function CategoryPageView({ categoryData }: CategoryPageViewProps) {
  const { name, products, optionGroups, recommended } = categoryData;

  return (
    <div className="h-full">
      <CategorySlideView />
      <section className="flex flex-col gap-5 px-5 py-4 max-w-7xl mx-auto w-full">
        <CategoryHeader title={name} count={products.length} />
        <ProductListWithPopup
          products={products}
          optionGroups={optionGroups}
          recommended={recommended}
        />
      </section>
    </div>
  );
}
