"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

export const forgotPassword = async (email: string) => {
	try {
		await auth.api.forgetPassword({
			body: {
				email,
			},
		});
		return {
			success: true,
			message: `A password reset link has been sent to ${email}. Please check your inbox to continue.`,
		};
	} catch (error) {
		if (error instanceof APIError) {
			return {
				error: error.message,
			};
		}

		return {
			error:
				"An unexpected error occurred while processing your request. Please try again later or contact support.",
		};
	}
};
