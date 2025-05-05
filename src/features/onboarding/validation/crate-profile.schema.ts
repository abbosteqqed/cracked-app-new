import * as z from "zod";

export const createProfileSchema = z.object({
	age: z.number(),
	usedFor: z.string().min(1, "Used for is required!"),
	gender: z.string().nullable(),
	language: z.string().min(1, "Language is required"),
});

export type CreateProfileDTO = z.infer<typeof createProfileSchema>;
