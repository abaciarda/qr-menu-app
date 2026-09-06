import { getCategories } from "@/lib/queries";
import CategorySlideViewClient from "./CategorySlideViewClient";

export default async function CategorySlideView() {
    const categories = await getCategories();

    return (
        <CategorySlideViewClient categories={categories} />
    )
}