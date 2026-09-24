import { db } from "@/lib/db";
import { CategoryPageDTO, SlideCategory } from "@/types/category";
import { unstable_cache } from "next/cache";

export const getCategories = unstable_cache(
  async (): Promise<SlideCategory[]> => {
    const [categories, products] = await Promise.all([
      db.orm.public.Category
        .where({ isActive: true })
        .select("id", "name", "slug", "image")
        .orderBy((c) => c.sortOrder.asc())
        .all(),

      db.orm.public.Product
        .where({ isAvailable: true })
        .select("categoryId")
        .all(),
    ]);

    const countByCategory = new Map<number, number>();
    products.forEach((product) => {
      countByCategory.set(product.categoryId, (countByCategory.get(product.categoryId) ?? 0) + 1);
    });

    return categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      image: cat.image,
      productCount: countByCategory.get(cat.id) ?? 0,
    }));
  },
  ["categories-list"],
  { revalidate: 120, tags: ["categories"] }
);

export const getCategoryBySlug = (slug: string): Promise<CategoryPageDTO | null> => {
  return unstable_cache(
    async (): Promise<CategoryPageDTO | null> => {
      const category = await db.orm.public.Category
        .select("id", "name", "slug", "image")
        .first({ slug, isActive: true });

      if (!category) return null;

      const [products, optionGroups, recommended] = await Promise.all([
        db.orm.public.Product
          .where({ categoryId: category.id, isAvailable: true })
          .select("id", "name", "description", "price", "image")
          .orderBy((p) => p.sortOrder.asc())
          .all(),
        db.orm.public.OptionGroup
          .where({ categoryId: category.id })
          .include("options", (o) => o.orderBy((x) => x.sortOrder.asc()))
          .orderBy((g) => g.sortOrder.asc())
          .all(),
        db.orm.public.RecommendedItem
          .where({ categoryId: category.id })
          .select("id", "name", "price", "image")
          .orderBy((r) => r.sortOrder.asc())
          .all(),
      ]);

      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        image: category.image,
        products: products.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: Number(p.price),
          image: p.image,
        })),
        optionGroups: optionGroups.map((g) => ({
          id: g.id,
          label: g.label,
          required: g.isRequired,
          options: g.options.map((o) => o.label),
        })),
        recommended: recommended.map((r) => ({
          id: r.id,
          name: r.name,
          price: Number(r.price),
          image: r.image,
        })),
      };
    },
    [`category-${slug}`],
    { revalidate: 120, tags: ["categories", `category-${slug}`] }
  )();
};

const DEFAULT_CONFIG = {
  id: 1,
  name: "Atlas Restaurant & Lounge",
  description: "Akdeniz ve Ege mutfağının seçkin lezzetleri, artizan kahveler ve imza kokteyller.",
  logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80",
  phone: "+90 (212) 245 80 90",
  whatsappNumber: "905321234567",
  address: "Kemankeş Karamustafa Paşa Mah. Rıhtım Cad. No: 42/A, Karaköy, Beyoğlu / İstanbul",
  googleMapsUrl: "https://maps.google.com/?q=Karakoy+Istanbul",
  instagramUrl: "https://instagram.com/atlasrestauranttr",
  wifiName: "Atlas_Guest_5G",
  wifiPassword: "AtlasKarakoy2026",
  currencySymbol: "₺",
};

export const getRestaurantConfig = unstable_cache(
  async () => {
    try {
      const config = await db.orm.public.RestaurantConfig
        .select(
          "id", "name", "description", "logo", "phone", "whatsappNumber",
          "address", "googleMapsUrl", "instagramUrl", "wifiName",
          "wifiPassword", "currencySymbol"
        )
        .first({ id: 1 });

      if (config) return config;

      await db.orm.public.RestaurantConfig.create(DEFAULT_CONFIG).catch(() => null);
      return DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  },
  ["restaurant-config"],
  { revalidate: 3600, tags: ["config"] }
);

export * from "./queries/dashboard";
export * from "./queries/categories";
export * from "./queries/product";