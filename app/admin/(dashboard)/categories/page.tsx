import { getCategoriesForAdmin, getOptionGroupsForAdmin } from "@/lib/queries/categories";
import CategoriesContent from "./CategoriesContent";

export default async function CategoriesPage() {
  const [categories, optionGroups] = await Promise.all([
    getCategoriesForAdmin(),
    getOptionGroupsForAdmin(),
  ]);

  return (
    <CategoriesContent
      initialCategories={categories}
      initialOptionGroups={optionGroups}
    />
  );
}
