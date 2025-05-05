import { z } from "zod";

export const emailAndOtpSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
        .email({ message: "Please enter a valid email address" })
        .max(100, { message: "Email must be at most 100 characters long" })
        .trim(),

    // Add validation for a 6-digit OTP
    otp: z
        .string()
        .length(6, { message: "OTP must be exactly 6 digits" }) // Check for exact length
        .refine((value) => /^\d+$/.test(value), {
            // Refine to ensure only digits
            message: "OTP must contain only numbers",
        })
        .optional(),
});
export type EmailAndOtpInput = z.infer<typeof emailAndOtpSchema>;
