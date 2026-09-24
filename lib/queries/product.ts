import { db } from "../db";

export async function getProducts(options?: { categoryId?: number }) {
    let query = db.orm.public.Product;

    if(options?.categoryId) {
        query = query.where({ categoryId: options.categoryId });
    }

    const products = await query
        .select("id", "categoryId", "name", "description", "price", "image", "isAvailable", "sortOrder")
        .orderBy((product) => product.sortOrder.asc())
        .all();

    return products.map((product) => ({
        id: product.id,
        categoryId: product.categoryId,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        image: product.image,
        isAvailable: product.isAvailable,
        sortOrder: product.sortOrder,
    }));
}

export async function getProductById(id: number) {
    const product = await db.orm.public.Product
        .select("id", "categoryId", "name", "description", "price", "image", "isAvailable", "sortOrder")
        .first({ id });

    if(!product) return null;

    return {
        id: product.id,
        categoryId: product.categoryId,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        image: product.image,
        isAvailable: product.isAvailable,
        sortOrder: product.sortOrder,
    };
}