"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

export const sendEmailVerification = async (email: string) => {
	try {
		await auth.api.sendVerificationEmail({
			body: {
				email,
			},
		});
		return {
			success: true,
			message: "Send email verification successfully!",
		};
	} catch (error) {
		if (error instanceof APIError) {
			console.log(error.message);
			return {
				error: error.message,
			};
		}

		return {
			error: "An unexpected error occurred. Please try again later.",
		};
	}
};
