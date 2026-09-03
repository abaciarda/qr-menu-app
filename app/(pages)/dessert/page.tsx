import CategoryPageView from "@/app/components/CategoryPageView";
import desserts from "./products.json";

export default function DessertPage() {
  return <CategoryPageView title="Desserts" categoryKey="dessert" products={desserts} />;
}