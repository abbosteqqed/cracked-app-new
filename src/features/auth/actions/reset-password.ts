"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

export const resetPassword = async ({
	newPassword,
	token,
}: {
	newPassword: string;
	token?: string | null;
}) => {
	try {
		if (!token) {
			return {
				error:
					"Password reset token is missing. Please use the complete link from your email.",
			};
		}
		await auth.api.resetPassword({
			body: {
				newPassword,
				token,
			},
		});

		return {
			success: true,
			message: "Your password has been successfully reset.",
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
				"An unexpected error occurred while processing your request. Please try again later or contact support.",
		};
	}
};
