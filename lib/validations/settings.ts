import z from "zod";

export const updateRestaurantConfigSchema = z.object({
    name: z.string()
        .min(2, { message: "Restaurant name must be at least 2 characters." })
        .trim()
        .optional(),
    description: z.string()
        .trim()
        .optional(),
    logo: z.string()
        .url({ message: "Logo must be a valid URL." })
        .optional()
        .or(z.literal("")),
    phone: z.string()
        .trim()
        .optional(),
    whatsappNumber: z.string()
        .trim()
        .optional(),
    address: z.string()
        .trim()
        .optional(),
    googleMapsUrl: z.string()
        .url({ message: "Google Maps URL must be valid." })
        .optional()
        .or(z.literal("")),
    instagramUrl: z.string()
        .url({ message: "Instagram URL must be valid." })
        .optional()
        .or(z.literal("")),
    wifiName: z.string()
        .trim()
        .optional(),
    wifiPassword: z.string()
        .trim()
        .optional(),
    currencySymbol: z.string()
        .min(1, { message: "Currency symbol is required." })
        .max(3, { message: "Currency symbol must be 1-3 characters." })
        .trim()
        .optional(),
});

export type UpdateRestaurantConfigInput = z.infer<typeof updateRestaurantConfigSchema>;
export type UpdateRestaurantConfigFormValues = z.input<typeof updateRestaurantConfigSchema>;
