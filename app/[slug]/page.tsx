import { getCategories, getCategoryBySlug } from "@/lib/queries";
import { notFound } from "next/navigation";
import CategoryPageView from "../components/CategoryPageView";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;

    const categoryData = await getCategoryBySlug(slug);

    if(!categoryData) {
        notFound();
    }

    return (
        <CategoryPageView categoryData={ categoryData } />
    )
}