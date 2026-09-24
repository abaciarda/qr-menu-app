import { db } from "../db";

export async function getDashboardStats() {
    const [totalProducts, totalCategories, outOfStockProducts, recentProducts] = await Promise.all([
        db.orm.public.Product.select("id").all().then(products => products.length),
        db.orm.public.Category.where({ isActive: true }).select("id").all().then(categories => categories.length),
        db.orm.public.Product
            .where({ isAvailable: false })
            .select("id", "name", "categoryId", "price", "image")
            .orderBy((p) => p.createdAt.desc())
            .limit(10)
            .all(),
        db.orm.public.Product
            .select("id", "name", "categoryId", "price", "image", "createdAt")
            .orderBy((p) => p.createdAt.desc())
            .limit(5)
            .all(),
    ]);

    const inStockCount = totalProducts - outOfStockProducts.length;

    return {
        totalProducts,
        totalCategories,
        inStockCount,
        outOfStockCount: outOfStockProducts.length,
        outOfStockProducts: outOfStockProducts.map((p) => ({
            id: p.id,
            name: p.name,
            categoryId: p.categoryId,
            price: Number(p.price),
            image: p.image,
        })),
        recentProducts: recentProducts.map((p) => ({
            id: p.id,
            name: p.name,
            categoryId: p.categoryId,
            price: Number(p.price),
            image: p.image,
            createdAt: new Date(p.createdAt.epochMilliseconds),
        })),
    };
}

export async function getCategoryBreakdown() {
    const categories = await db.orm.public.Category
        .where({ isActive: true })
        .select("id", "name", "slug", "image")
        .orderBy((c) => c.sortOrder.asc())
        .all();

    const products = await db.orm.public.Product
        .where({ isAvailable: true })
        .select("categoryId")
        .all();

    const countMap = new Map<number, number>();
    products.forEach((product) => {
        countMap.set(product.categoryId, (countMap.get(product.categoryId) ?? 0) + 1);
    });

    return categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        image: cat.image,
        productCount: countMap.get(cat.id) ?? 0,
    }));
}
