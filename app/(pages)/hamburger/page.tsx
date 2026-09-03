import CategoryPageView from "@/app/components/CategoryPageView";
import burgers from "./products.json";

export default function BurgerPage() {
  return <CategoryPageView title="Burgers" categoryKey="hamburger" products={burgers} />;
}