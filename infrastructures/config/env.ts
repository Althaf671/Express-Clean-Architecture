import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL:           z.string().min(1),
    CLOUDINARY_NAME:        z.string().min(1),
    CLOUDINARY_ID:          z.string().min(1),
    CLOUDINARY_SECRET:      z.string().min(1),
    WHITELIST_EMAIL:        z.string().min(1),
    GOOGLE_ID:              z.string().min(1),
    GOOGLE_SECRET:          z.string().min(1),
    IS_PRODUCTION:          z.string().min(1).transform((v) => v === "true"),
    LOCALHOST_CALLBACK_URL: z.string().min(1),
});

export const ENV = envSchema.parse(process.env);