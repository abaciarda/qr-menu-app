import CategoryCard, { Category } from "./components/cards/CategoryCard";
import burgers from "./(pages)/hamburger/products.json";
import pizzas from "./(pages)/pizza/products.json";
import desserts from "./(pages)/dessert/products.json";
import coffees from "./(pages)/coffee/products.json";
import coldDrinks from "./(pages)/cold-drink/products.json";

const categories: Category[] = [
  { name: "Hamburger", image: "/images/categories/burger.png", count: burgers.length, link: "/hamburger" },
  { name: "Pizza", image: "/images/categories/pizza.jpg", count: pizzas.length, link: "/pizza" },
  { name: "Dessert", image: "/images/categories/dessert.jpg", count: desserts.length, link: "/dessert" },
  { name: "Coffee", image: "/images/categories/coffee.jpg", count: coffees.length, link: "/coffee" },
  { name: "Cold Drink", image: "/images/categories/drink.jpg", count: coldDrinks.length, link: "/cold-drink" },
];

export default function Home() {
  return (
    <div className="font-sans h-full">
      <div className="bg-surface px-5 py-3 text-center text-ink-muted tracking-wide border-b border-line text-sm">
        Browse the menu and tell your waiter what you'd like.
      </div>

      <section className="flex flex-col gap-5 px-5 py-4">
        <h1 className="text-xl font-semibold -mb-2">Categories</h1>

        <div className="grid md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </section>
    </div>
  );
}
