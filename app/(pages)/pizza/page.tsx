import CategorySlideView from "@/app/components/cards/CategorySlideView";
import ProductCard from "@/app/components/cards/ProductCard";
import { categoryConfig } from "@/app/data/categoryOptions";
import pizzas from "./products.json";
import ContentAnimation from "@/app/components/ContentAnimation";

export default function PizzaPage() {
  const { optionGroups, recommended } = categoryConfig.pizza;
  return (
    <div className="h-full">
      <CategorySlideView />
      <section className="flex flex-col gap-5 px-5 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-bold text-xl text-ink">Pizzas</h1>
          <p className="text-sm text-ink-muted">{pizzas.length} Products</p>
        </div>
        <ContentAnimation>
          {pizzas.map((pizza) => (
            <ProductCard key={pizza.name} {...pizza} optionGroups={optionGroups} recommended={recommended} />
          ))}
        </ContentAnimation>
      </section>
    </div>
  );
}