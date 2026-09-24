import { db } from "../db";

export async function getCategories() {
    const categories = await db.orm.public.Category
        .where({ isActive: true })
        .select("id", "name", "slug", "image", "sortOrder", "isActive")
        .orderBy((category) => category.sortOrder.asc())
        .all();

    return categories.map((category) => ({
        ...category
    }))
}

export async function getCategoryById(id: number) {
    const category = await db.orm.public.Category
        .select("id", "name")
        .first({ id });

    if (!category) return null;

    return category;
}

export async function getCategoriesForAdmin() {
    const [categories, products] = await Promise.all([
        db.orm.public.Category
            .select("id", "name", "slug", "image", "sortOrder", "isActive")
            .orderBy((c) => c.sortOrder.asc())
            .all(),
        db.orm.public.Product
            .select("categoryId")
            .all(),
    ]);

    const countMap = new Map<number, number>();
    products.forEach((product) => {
        countMap.set(product.categoryId, (countMap.get(product.categoryId) ?? 0) + 1);
    });

    return categories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        image: c.image,
        sortOrder: c.sortOrder,
        isActive: c.isActive,
        productCount: countMap.get(c.id) ?? 0,
    }));
}
export async function getOptionGroupsForAdmin() {
    const groups = await db.orm.public.OptionGroup
        .select("id", "categoryId", "label", "isRequired", "sortOrder")
        .include("options", (opts) =>
            opts
                .select("id", "label", "sortOrder")
                .orderBy((o) => o.sortOrder.asc())
        )
        .orderBy((g) => g.sortOrder.asc())
        .all();
    return groups.map((g) => ({
        id: g.id,
        categoryId: g.categoryId,
        label: g.label,
        isRequired: g.isRequired,
        sortOrder: g.sortOrder,
        options: g.options.map((o) => ({
            id: o.id,
            label: o.label,
            sortOrder: o.sortOrder,
        })),
    }));
}