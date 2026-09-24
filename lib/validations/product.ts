import z from "zod";

export const createProductSchema = z.object({
    name: z.string()
        .min(2, { message: "Product name must be at least 2 characters long." })
        .trim(),
    categoryId: z.coerce.number().int().positive({ message: "Please select a valid category." }),
    price: z.coerce
        .number()
        .positive({ message: "Price must be a positive number." })
        .max(999999.99, { message: "Price exceeds maximum allowed value." }),
    description: z.string()
        .min(5, { message: "Description must be at least 5 characters long." })
        .trim(),
    image: z.string()
        .optional(),
    isAvailable: z.boolean().default(true),
    sortOrder: z.coerce.number().int().default(0)
});

export const updateProductSchema = createProductSchema.partial().extend({
    id: z.number().int().positive(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type CreateProductFormValues = z.input<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type UpdateProductFormValues = z.input<typeof updateProductSchema>;

