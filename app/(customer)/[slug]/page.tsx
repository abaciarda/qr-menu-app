import { getCategoryBySlug, getRestaurantConfig } from "@/lib/queries";
import { ProductDTO } from "@/types/category";
import { notFound } from "next/navigation";
import CategoryPageView from "@/app/components/CategoryPageView";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [categoryData, config] = await Promise.all([
    getCategoryBySlug(slug),
    getRestaurantConfig(),
  ]);

  if (!categoryData) {
    return {
      title: "Category Not Found",
    };
  }

  const title = `${categoryData.name} Menu`;
  const productNames = categoryData.products.slice(0, 3).map((p) => p.name).join(", ");
  const restaurantName = config?.name || "Atlas Restaurant & Lounge";
  const description = `Discover our ${categoryData.name} menu at ${restaurantName}. Features ${categoryData.products.length} items including ${productNames}.`;
  const image = categoryData.image || config?.logo || "";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${restaurantName}`,
      description,
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${restaurantName}`,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [categoryData, config] = await Promise.all([
    getCategoryBySlug(slug),
    getRestaurantConfig(),
  ]);

  if (!categoryData) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuSection",
    name: categoryData.name,
    description: `${categoryData.name} items at ${config?.name || "Atlas Restaurant & Lounge"}`,
    image: categoryData.image,
    hasMenuItem: categoryData.products.map((product: ProductDTO) => ({
      "@type": "MenuItem",
      name: product.name,
      description: product.description,
      image: product.image,
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: config?.currencySymbol === "₺" ? "TRY" : "USD",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryPageView categoryData={categoryData} />
    </>
  );
}
