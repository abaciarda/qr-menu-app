import { getProducts } from "@/lib/queries/product";
import { getCategoriesAction } from "./actions";
import ProductsContentPage from "./ProductsContent";

export default async function ProductsPage() {
  const [products, categoriesResult] = await Promise.all([
    getProducts(),
    getCategoriesAction(),
  ]);

  const categoryMap = new Map(
    (categoriesResult.categories as { id: number; name: string }[]).map(
      (c) => [c.id, c.name]
    )
  );

  const productsWithCategory = products.map((p) => ({
    ...p,
    categoryName: categoryMap.get(p.categoryId) ?? "Unknown",
  }));

  return <ProductsContentPage initialProducts={productsWithCategory} />;
}