import CategorySlideView from "@/app/components/cards/CategorySlideView";
import ProductCard from "@/app/components/cards/ProductCard";
import { categoryConfig } from "@/app/data/categoryOptions";
import coffees from "./products.json";
import ContentAnimation from "@/app/components/ContentAnimation";

export default function CoffeePage() {
  const { optionGroups, recommended } = categoryConfig.coffee;
  return (
    <div className="h-full">
      <CategorySlideView />
      <section className="flex flex-col gap-5 px-5 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-bold text-xl text-ink">Coffees</h1>
          <p className="text-sm text-ink-muted">{coffees.length} Products</p>
        </div>
        <ContentAnimation>
          {coffees.map((item) => (
            <ProductCard key={item.name} {...item} optionGroups={optionGroups} recommended={recommended} />
          ))}
        </ContentAnimation>
      </section>
    </div>
  );
}