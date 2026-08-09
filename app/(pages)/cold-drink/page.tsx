import CategorySlideView from "@/app/components/cards/CategorySlideView";
import ProductCard from "@/app/components/cards/ProductCard";
import { categoryConfig } from "@/app/data/categoryOptions";
import coldDrinks from "./products.json";
import ContentAnimation from "@/app/components/ContentAnimation";

export default function ColdDrinkPage() {
  const { optionGroups, recommended } = categoryConfig["cold-drink"];
  return (
    <div className="h-full">
      <CategorySlideView />
      <section className="flex flex-col gap-5 px-5 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-bold text-xl text-ink">Cold Drinks</h1>
          <p className="text-sm text-ink-muted">{coldDrinks.length} Products</p>
        </div>
        <ContentAnimation>
          {coldDrinks.map((drink) => (
            <ProductCard key={drink.name} {...drink} optionGroups={optionGroups} recommended={recommended} />
          ))}
        </ContentAnimation>
      </section>
    </div>
  );
}