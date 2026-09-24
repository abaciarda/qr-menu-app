"use server";

import { db } from "@/lib/db";
import { CreateProductInput, createProductSchema, UpdateProductInput, updateProductSchema } from "@/lib/validations/product";
import { FieldOutputTypes } from "@/prisma/contract";
import { revalidatePath } from "next/cache";

type ProductPrice = FieldOutputTypes["public"]["Product"]["price"];

export async function getCategoriesAction() {
    try {
        const categories = await db.orm.public.Category
            .where({ isActive: true })
            .select("id", "name")
            .orderBy((c) => c.sortOrder.asc())
            .all();
        return { success: true, categories: await categories };
    } catch (error) {
        return { success: false, categories: [] };
    }
}

export async function createProductAction(data: CreateProductInput) {
    const validation = createProductSchema.safeParse(data);

    if (!validation.success) {
        return {
            success: false,
            error: "Validation failed. Please check the product details",
            fieldErrors: validation.error.flatten().fieldErrors,
        };
    }

    try {
        const newProduct = await db.orm.public.Product.create({
            name: validation.data.name,
            categoryId: validation.data.categoryId,
            price: validation.data.price.toFixed(2) as ProductPrice,
            description: validation.data.description,
            image: validation.data.image || '',
            isAvailable: validation.data.isAvailable,
            sortOrder: validation.data.sortOrder,
        });

        revalidatePath("/admin/products");
        revalidatePath("/admin/dashboard");
        revalidatePath("/");
        return {
            success: true,
            product: {
                id: newProduct.id,
                name: newProduct.name,
                categoryId: newProduct.categoryId,
                price: Number(newProduct.price),
                description: newProduct.description,
                image: newProduct.image,
                isAvailable: newProduct.isAvailable,
                sortOrder: newProduct.sortOrder,
            },
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to create product in database.",
        };
    }
}

export async function updateProductAction(data: UpdateProductInput) {
    const validation = updateProductSchema.safeParse(data);

    if (!validation.success) {
        return {
            success: false,
            error: "Validation failed. Please check the product details",
            fieldErrors: validation.error.flatten().fieldErrors,
        };
    }

    const { id, name, categoryId, price, description, image, isAvailable, sortOrder } = validation.data;

    try {
        const updatedProduct = await db.orm.public.Product
            .where({ id })
            .update({
                ...(name !== undefined && { name }),
                ...(categoryId !== undefined && { categoryId }),
                ...(price !== undefined && { price: price.toFixed(2) as ProductPrice }),
                ...(description !== undefined && { description }),
                ...(image !== undefined && { image: image || '' }),
                ...(isAvailable !== undefined && { isAvailable }),
                ...(sortOrder !== undefined && { sortOrder }),
            });


        if (!updatedProduct) {
            return { success: false, error: "Product not found." };
        }

        revalidatePath("/admin/products");
        revalidatePath(`/admin/products/${id}/edit`);
        revalidatePath("/admin/dashboard");
        revalidatePath("/");

        return {
            success: true,
            product: {
                id: updatedProduct.id,
                name: updatedProduct.name,
                categoryId: updatedProduct.categoryId,
                price: Number(updatedProduct.price),
                description: updatedProduct.description,
                image: updatedProduct.image,
                isAvailable: updatedProduct.isAvailable,
                sortOrder: updatedProduct.sortOrder,
            },
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to update product.",
        };
    }
}

export async function toggleProductStockAction(id: number, isAvailable: boolean) {
    try {
        await db.orm.public.Product.where({ id }).update({ isAvailable });
        revalidatePath("/admin/products");
        revalidatePath("/admin/dashboard");
        revalidatePath("/");
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to update stock status." }
    }
}

export async function deleteProduct(id: number) {
    try {
        await db.orm.public.Product.where({ id }).delete();
        revalidatePath("/admin/products");
        revalidatePath("/admin/dashboard");
        revalidatePath("/");
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to delete product." };
    }
}