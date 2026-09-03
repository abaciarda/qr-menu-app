import CategorySlideView from "@/app/components/cards/CategorySlideView";
import ProductCard from "@/app/components/cards/ProductCard";
import CategoryHeader from "@/app/components/CategoryHeader";
import ContentAnimation from "@/app/components/ContentAnimation";
import { categoryConfig } from "@/app/data/categoryOptions";

export type ProductItem = {
  name: string;
  description: string;
  price: number;
  image: string;
};

interface CategoryPageViewProps {
  title: string;
  categoryKey: string;
  products: ProductItem[];
}

export default function CategoryPageView({ title, categoryKey, products }: CategoryPageViewProps) {
  const { optionGroups, recommended } = categoryConfig[categoryKey] ?? {};

  return (
    <div className="h-full">
      <CategorySlideView />
      <section className="flex flex-col gap-5 px-5 py-4 max-w-7xl mx-auto w-full">
        <CategoryHeader title={title} count={products.length} />
        <ContentAnimation>
          {products.map((product) => (
            <ProductCard key={product.name} {...product} optionGroups={optionGroups} recommended={recommended} />
          ))}
        </ContentAnimation>
      </section>
    </div>
  );
}
