import CategoryPageView from "@/app/components/CategoryPageView";
import coldDrinks from "./products.json";

export default function ColdDrinkPage() {
  return <CategoryPageView title="Cold Drinks" categoryKey="cold-drink" products={coldDrinks} />;
}