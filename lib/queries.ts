import { prisma } from "@/lib/prisma";
import { CategoryPageDTO, SlideCategory } from "@/types/category";
import { unstable_cache } from "next/cache";

export const getCategories = unstable_cache(
  async (): Promise<SlideCategory[]> => {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        _count: {
          select: {
            products: {
              where: { isAvailable: true },
            },
          },
        },
      },
    });

    return categories.map((cat) => ({
      id: Number(cat.id),
      name: cat.name,
      slug: cat.slug,
      image: cat.image,
      productCount: cat._count.products,
    }));
  },
  ["categories-list"],
  {
    revalidate: 120,
    tags: ["categories"],
  }
);

export const getCategoryBySlug = (slug: string): Promise<CategoryPageDTO | null> => {
  return unstable_cache(
    async (): Promise<CategoryPageDTO | null> => {
      const result = await prisma.$queryRaw<Array<{
        id: bigint | number;
        name: string;
        slug: string;
        image: string;
        products: string | unknown[];
        optionGroups: string | unknown[];
        recommended: string | unknown[];
      }>>`
        SELECT 
          c.id, c.name, c.slug, c.image,
          (
            SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                'id', p.id,
                'name', p.name,
                'description', p.description,
                'price', CAST(p.price AS DOUBLE),
                'image', p.image
              )
            )
            FROM (
              SELECT id, name, description, price, image 
              FROM products 
              WHERE category_id = c.id AND is_available = 1 
              ORDER BY sort_order ASC
            ) p
          ) as products,
          (
            SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                'id', og.id,
                'label', og.label,
                'required', IF(og.is_required, TRUE, FALSE),
                'options', (
                  SELECT JSON_ARRAYAGG(ogo.label)
                  FROM (
                    SELECT label FROM option_group_options 
                    WHERE option_group_id = og.id 
                    ORDER BY sort_order ASC
                  ) ogo
                )
              )
            )
            FROM (
              SELECT id, label, is_required 
              FROM option_groups 
              WHERE category_id = c.id 
              ORDER BY sort_order ASC
            ) og
          ) as optionGroups,
          (
            SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                'id', ri.id,
                'name', ri.name,
                'price', CAST(ri.price AS DOUBLE),
                'image', ri.image
              )
            )
            FROM (
              SELECT id, name, price, image 
              FROM recommended_items 
              WHERE category_id = c.id 
              ORDER BY sort_order ASC
            ) ri
          ) as recommended
        FROM categories c
        WHERE c.slug = ${slug} AND c.is_active = 1
        LIMIT 1;
      `;

      if (!result || result.length === 0) return null;

      const row = result[0];
      const parseJson = (val: unknown) => {
        if (!val) return [];
        if (typeof val === "string") {
          try { return JSON.parse(val); } catch { return []; }
        }
        return Array.isArray(val) ? val : [];
      };

      const products = parseJson(row.products).map((p: any) => ({
        id: Number(p.id),
        name: String(p.name || ""),
        description: String(p.description || ""),
        price: Number(p.price || 0),
        image: String(p.image || ""),
      }));

      const optionGroups = parseJson(row.optionGroups).map((g: any) => ({
        id: Number(g.id),
        label: String(g.label || ""),
        required: Boolean(g.required),
        options: parseJson(g.options).map((o: any) => String(typeof o === "object" ? o.label : o)),
      }));

      const recommended = parseJson(row.recommended).map((r: any) => ({
        id: Number(r.id),
        name: String(r.name || ""),
        price: Number(r.price || 0),
        image: String(r.image || ""),
      }));

      return {
        id: Number(row.id),
        name: row.name,
        slug: row.slug,
        image: row.image,
        products,
        optionGroups,
        recommended,
      };
    },
    [`category-${slug}`],
    {
      revalidate: 120,
      tags: ["categories", `category-${slug}`],
    }
  )();
};