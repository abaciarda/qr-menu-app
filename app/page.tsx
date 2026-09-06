import { getCategories } from "@/lib/queries";
import CategoryCard from "./components/cards/CategoryCard";

export default async function Home() {
  const categories = await getCategories();
  return (
    <div className="font-sans h-full">
      <div className="bg-surface px-5 py-3 text-center text-ink-muted tracking-wide border-b border-line text-sm">
        Browse the menu and tell your waiter what you'd like.
      </div>

      <section className="flex flex-col gap-5 px-5 py-4 max-w-7xl mx-auto w-full">
        <h1 className="text-xl font-semibold -mb-2">Categories</h1>

        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </section>
    </div>
  );
}
