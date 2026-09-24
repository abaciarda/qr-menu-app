"use server";

import { db } from "@/lib/db";
import { UpdateRestaurantConfigInput, updateRestaurantConfigSchema } from "@/lib/validations/settings";
import { revalidatePath } from "next/cache";

export async function updateRestaurantConfigAction(data: UpdateRestaurantConfigInput) {
    const validation = updateRestaurantConfigSchema.safeParse(data);

    if (!validation.success) {
        return {
            success: false as const,
            error: "Validation failed. Please check the settings details.",
            fieldErrors: validation.error.flatten().fieldErrors,
        };
    }

    try {
        const updated = await db.orm.public.RestaurantConfig
            .where({ id: 1 })
            .update({
                ...(validation.data.name !== undefined && { name: validation.data.name }),
                ...(validation.data.description !== undefined && { description: validation.data.description }),
                ...(validation.data.logo !== undefined && { logo: validation.data.logo || null }),
                ...(validation.data.phone !== undefined && { phone: validation.data.phone || null }),
                ...(validation.data.whatsappNumber !== undefined && { whatsappNumber: validation.data.whatsappNumber || null }),
                ...(validation.data.address !== undefined && { address: validation.data.address || null }),
                ...(validation.data.googleMapsUrl !== undefined && { googleMapsUrl: validation.data.googleMapsUrl || null }),
                ...(validation.data.instagramUrl !== undefined && { instagramUrl: validation.data.instagramUrl || null }),
                ...(validation.data.wifiName !== undefined && { wifiName: validation.data.wifiName || null }),
                ...(validation.data.wifiPassword !== undefined && { wifiPassword: validation.data.wifiPassword || null }),
                ...(validation.data.currencySymbol !== undefined && { currencySymbol: validation.data.currencySymbol }),
            });

        if (!updated) {
            return { success: false as const, error: "Failed to update settings." };
        }

        revalidatePath("/admin/settings");
        revalidatePath("/admin/dashboard");
        revalidatePath("/");

        return {
            success: true as const,
            config: {
                id: updated.id,
                name: updated.name,
                description: updated.description,
                logo: updated.logo,
                phone: updated.phone,
                whatsappNumber: updated.whatsappNumber,
                address: updated.address,
                googleMapsUrl: updated.googleMapsUrl,
                instagramUrl: updated.instagramUrl,
                wifiName: updated.wifiName,
                wifiPassword: updated.wifiPassword,
                currencySymbol: updated.currencySymbol,
            },
        };
    } catch (error) {
        return {
            success: false as const,
            error: "Failed to update restaurant settings.",
        };
    }
}
