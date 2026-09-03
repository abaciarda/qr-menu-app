import CategoryPageView from "@/app/components/CategoryPageView";
import coffees from "./products.json";

export default function CoffeePage() {
  return <CategoryPageView title="Coffees" categoryKey="coffee" products={coffees} />;
}