import { z } from "zod";

export const passwordSchema = z
	.object({
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

export type PasswordInput = z.infer<typeof passwordSchema>;
