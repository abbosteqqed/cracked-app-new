"use server";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

export const emailVerification = async (token?: string | null) => {
	try {
		if (!token) {
			return {
				error:
					"Verification token is missing. Please use the complete link from your email.",
			};
		}
		await auth.api.verifyEmail({ query: { token } });
		return {
			success: true,
			message: "Your email has been successfully verified. You can now log in.",
		};
	} catch (error) {
		if (error instanceof APIError) {
			return {
				error: error.message,
			};
		}

		console.log(error);

		return {
			error:
				"An unexpected error occurred during email verification. Please try again later or contact support.",
		};
	}
};
