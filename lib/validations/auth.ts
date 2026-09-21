
import { z } from "zod";

export const loginSchema = z.object({
    username: z.string()
        .min(3, { message: "Username must be at leaast 3 characters long"})
        .trim(),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" }),
});

export type LoginInput = z.infer<typeof loginSchema>;