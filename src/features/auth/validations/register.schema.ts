import { z } from "zod";

export const registerSchema = z
	.object({
		name: z
			.string({
				required_error: "Name is required",
				invalid_type_error: "Name must be a string",
			})
			.min(2, { message: "Name must be at least 2 characters long" })
			.max(100, { message: "Name must be at most 100 characters long" })
			.trim(),

		email: z
			.string({
				required_error: "Email is required",
				invalid_type_error: "Email must be a string",
			})
			.email({ message: "Please enter a valid email address" })
			.max(100, { message: "Email must be at most 100 characters long" })
			.trim(),

		password: z
			.string({
				required_error: "Password is required",
				invalid_type_error: "Password must be a string",
			})
			.min(8, { message: "Password must be at least 8 characters long" })
			.max(100, { message: "Password must be at most 100 characters long" })

			.refine(
				(password) =>
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).+$/.test(
						password
					),
				{
					message:
						"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
				}
			),

		confirmPassword: z
			.string({
				required_error: "Confirm password is required",
				invalid_type_error: "Confirm password must be a string",
			})
			// Add basic length constraints for consistency, though the main check is the match
			.min(8, {
				message: "Confirm password must be at least 8 characters long",
			})
			.max(100, {
				message: "Confirm password must be at most 100 characters long",
			}),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Passwords do not match",
				path: ["confirmPassword"],
			});
		}
	});

export type RegisterInput = z.infer<typeof registerSchema>;
