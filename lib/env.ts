import "server-only";
import z from "zod";

const envSchema = z.object({
    JWT_SECRET: z.string().min(32).transform((value) => new TextEncoder().encode(value)),
    SESSION_COOKIE_NAME: z.string().min(3),
    ADMIN_USERNAME: z.string().min(3),
    ADMIN_PASSWORD: z.string().min(6)
})

export const env = envSchema.parse({
    JWT_SECRET: process.env.JWT_SECRET,
    SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
})