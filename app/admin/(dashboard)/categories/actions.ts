"use server"

import { db } from "@/lib/db";
import {
    CreateCategoryInput,
    createCategorySchema,
    CreateOptionGroupInput,
    createOptionGroupSchema,
    UpdateCategoryInput,
    updateCategorySchema,
} from "@/lib/validations/category";
import { revalidatePath } from "next/cache";

function toSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

export async function getCategoriesWithProductCountAction() {
    try {
        const [categories, products] = await Promise.all([
            db.orm.public.Category
                .select("id", "name", "slug", "image", "sortOrder", "isActive")
                .orderBy((category) => category.sortOrder.asc())
                .all(),

            db.orm.public.Product
                .where({ isAvailable: true })
                .select("categoryId")
                .all(),
        ]);

        const countMap = new Map<number, number>();
        products.forEach((product) => {
            countMap.set(product.categoryId, (countMap.get(product.categoryId) ?? 0) + 1);
        });

        return {
            success: true,
            categories: categories.map((c) => ({
                id: c.id,
                name: c.name,
                slug: c.slug,
                image: c.image,
                sortOrder: c.sortOrder,
                isActive: c.isActive,
                productCount: countMap.get(c.id) ?? 0,
            })),
        };
    } catch {
        return { success: false, categories: [] };
    }
}

export async function getOptionGroupsAction() {
    try {
        const groups = await db.orm.public.OptionGroup
            .select("id", "categoryId", "label", "isRequired", "sortOrder")
            .include("options", (opts) =>
                opts
                    .select("id", "label", "sortOrder")
                    .orderBy((o) => o.sortOrder.asc())
            )
            .orderBy((g) => g.sortOrder.asc())
            .all();

        return {
            success: true,
            optionGroups: groups.map((g) => ({
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
            })),
        };
    } catch {
        return { success: false, optionGroups: [] };
    }
}

export async function createCategoryAction(data: CreateCategoryInput) {
    const validation = createCategorySchema.safeParse(data);
    if (!validation.success) {
        return {
            success: false as const,
            error: "Validation failed.",
            fieldErrors: validation.error.flatten().fieldErrors,
            category: null,
        };
    }

    const { name, image, sortOrder } = validation.data;

    const imageData = image || '';

    try {
        const created = await db.orm.public.Category.create({
            name,
            slug: toSlug(name),
            image: imageData,
            sortOrder,
            isActive: true,
        });

        revalidatePath("/admin/categories");

        return {
            success: true as const,
            category: {
                id: created.id,
                name: created.name,
                slug: created.slug,
                image: created.image,
                sortOrder: created.sortOrder,
                isActive: created.isActive,
                productCount: 0,
            },
        };
    } catch {
        return {
            success: false as const,
            error: "Failed to create category. Name may already exist.",
            category: null,
        };
    }
}

export async function updateCategoryAction(data: UpdateCategoryInput) {
    const validation = updateCategorySchema.safeParse(data);
    if (!validation.success) {
        return {
            success: false as const,
            error: "Validation failed.",
            fieldErrors: validation.error.flatten().fieldErrors,
            category: null,
        };
    }

    const { id, name, image, sortOrder } = validation.data;

    try {
        const updated = await db.orm.public.Category
            .where({ id })
            .update({
                ...(name !== undefined && { name, slug: toSlug(name) }),
                ...(image !== undefined && { image }),
                ...(sortOrder !== undefined && { sortOrder }),
            });

        if (!updated) {
            return { success: false as const, error: "Category not found.", category: null };
        }

        revalidatePath("/admin/categories");

        return {
            success: true as const,
            category: {
                id: updated.id,
                name: updated.name,
                slug: updated.slug,
                image: updated.image,
                sortOrder: updated.sortOrder,
                isActive: updated.isActive,
            },
        };
    } catch {
        return {
            success: false as const,
            error: "Failed to update category.",
            category: null,
        };
    }
}

export async function toggleCategoryAction(id: number, isActive: boolean) {
    try {
        await db.orm.public.Category.where({ id }).update({ isActive });
        revalidatePath("/admin/categories");
        return { success: true as const };
    } catch {
        return { success: false as const, error: "Failed to toggle category visibility." };
    }
}

export async function deleteCategoryAction(id: number) {
    try {
        await db.orm.public.Category.where({ id }).delete();
        revalidatePath("/admin/categories");
        return { success: true as const };
    } catch {
        return { success: false as const, error: "Failed to delete category." };
    }
}

export async function createOptionGroupAction(data: CreateOptionGroupInput) {
    const validation = createOptionGroupSchema.safeParse(data);
    if (!validation.success) {
        return {
            success: false as const,
            error: "Validation failed.",
            fieldErrors: validation.error.flatten().fieldErrors,
            optionGroup: null,
        };
    }

    const { categoryId, label, isRequired, sortOrder, optionsRaw } = validation.data;

    const optionLabels = optionsRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    if (optionLabels.length === 0) {
        return {
            success: false as const,
            error: "At least one option is required.",
            optionGroup: null,
        };
    }

    try {
        const group = await db.orm.public.OptionGroup.create({
            categoryId,
            label,
            isRequired,
            sortOrder,
        });

        const createdOptions: { id: number; label: string; sortOrder: number }[] = [];
        for (let i = 0; i < optionLabels.length; i++) {
            const opt = await db.orm.public.OptionGroupOption.create({
                optionGroupId: group.id,
                label: optionLabels[i],
                sortOrder: i,
            });
            createdOptions.push({ id: opt.id, label: opt.label, sortOrder: opt.sortOrder });
        }

        revalidatePath("/admin/categories");

        return {
            success: true as const,
            optionGroup: {
                id: group.id,
                categoryId: group.categoryId,
                label: group.label,
                isRequired: group.isRequired,
                sortOrder: group.sortOrder,
                options: createdOptions,
            },
        };
    } catch {
        return {
            success: false as const,
            error: "Failed to create option group.",
            optionGroup: null,
        };
    }
}

export async function deleteOptionGroupAction(id: number) {
    try {
        await db.orm.public.OptionGroup.where({ id }).delete();
        revalidatePath("/admin/categories");
        return { success: true as const };
    } catch {
        return { success: false as const, error: "Failed to delete option group." };
    }
}
