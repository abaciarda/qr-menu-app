import z from "zod";

export const createCategorySchema = z.object({
    name: z.string()
        .min(2, { message: "Category name must be at least 2 characters." })
        .trim(),
    image: z.string()
        .optional()
        .refine((val) => !val || val.length > 0, { message: "Category image is required" }),
    sortOrder: z.coerce.number().int().default(0)
});

export const updateCategorySchema = createCategorySchema.partial().extend({
    id: z.number().int().positive()
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type CreateCategoryFormValues = z.input<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type UpdateCategoryFormValues = z.input<typeof updateCategorySchema>;

export const createOptionGroupSchema = z.object({
    categoryId: z.coerce.number().int().positive({ message: "Please select a category." }),
    label: z.string()
      .min(2, { message: "Group label must be at least 2 characters." })
      .trim(),
    isRequired: z.boolean().default(false),
    sortOrder: z.coerce.number().int().default(0),
    optionsRaw: z.string()
      .min(1, { message: "Provide at least one option (comma-separated)." })
      .trim(),
});

export type CreateOptionGroupInput      = z.infer<typeof createOptionGroupSchema>;
export type CreateOptionGroupFormValues = z.input<typeof createOptionGroupSchema>;