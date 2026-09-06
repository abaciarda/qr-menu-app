import CategorySlideView from "@/app/components/cards/CategorySlideView";
import ProductCard from "@/app/components/cards/ProductCard";
import CategoryHeader from "@/app/components/CategoryHeader";
import ContentAnimation from "@/app/components/ContentAnimation";
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
        <CategoryHeader title={ name } count={products.length} />
        <ContentAnimation>
          {products.map((product) => (
            <ProductCard key={product.name} {...product} optionGroups={optionGroups} recommended={recommended} />
          ))}
        </ContentAnimation>
      </section>
    </div>
  );
}
