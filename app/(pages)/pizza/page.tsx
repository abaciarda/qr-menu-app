import CategoryPageView from "@/app/components/CategoryPageView";
import pizzas from "./products.json";

export default function PizzaPage() {
  return <CategoryPageView title="Pizzas" categoryKey="pizza" products={pizzas} />;
}