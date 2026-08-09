import CategorySlideView from "@/app/components/cards/CategorySlideView";
import ProductCard from "@/app/components/cards/ProductCard";
import { categoryConfig } from "@/app/data/categoryOptions";
import burgers from "./products.json";

export default function BurgerPage() {
  const { optionGroups, recommended } = categoryConfig.hamburger;
  return (
    <div className="h-full">
      <CategorySlideView />
      <section className="flex flex-col gap-5 px-5 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-bold text-xl text-ink">Burgers</h1>
          <p className="text-sm text-ink-muted">{burgers.length} Products</p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {burgers.map((burger) => (
            <ProductCard key={burger.name} {...burger} optionGroups={optionGroups} recommended={recommended} />
          ))}
        </div>
      </section>
    </div>
  );
}