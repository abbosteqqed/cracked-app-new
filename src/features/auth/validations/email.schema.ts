import { z } from "zod";

export const emailSchema = z.object({
	email: z
		.string({
			required_error: "Email is required",
			invalid_type_error: "Email must be a string",
		})
		.email({ message: "Please enter a valid email address" })
		.max(100, { message: "Email must be at most 100 characters long" })
		.trim(),
});

export type EamilInput = z.infer<typeof emailSchema>;
