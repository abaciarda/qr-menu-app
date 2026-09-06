import { getCategories, getRestaurantConfig } from "@/lib/queries";
import CategoryCard from "./components/cards/CategoryCard";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getRestaurantConfig();
  const title = config.name ? `${config.name} — Menu` : "Digital Restaurant Menu";
  const description = config.description || "Browse our full digital restaurant menu, explore categories, and discover our chef recommendations.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: config.logo ? [{ url: config.logo }] : [],
    },
  };
}

export default async function Home() {
  const [categories, config] = await Promise.all([
    getCategories(),
    getRestaurantConfig(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: config.name || "Atlas Restaurant & Lounge",
    description: config.description || "Akdeniz ve Ege mutfağının seçkin lezzetleri",
    image: config.logo || "",
    telephone: config.phone || "",
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address || "",
    },
    menu: process.env.NEXT_PUBLIC_APP_URL || "https://qrmenu.app",
    servesCuisine: ["Mediterranean", "Aegean", "Cocktails", "Coffee"],
    priceRange: config.currencySymbol || "₺",
  };

  return (
    <div className="font-sans h-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-surface px-5 py-3 text-center text-ink-muted tracking-wide border-b border-line text-sm">
        Browse the menu and tell your waiter what you'd like.
      </div>

      <section className="flex flex-col gap-5 px-5 py-4 max-w-7xl mx-auto w-full">
        <h1 className="text-xl font-semibold -mb-2">Categories</h1>

        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </section>
    </div>
  );
}
