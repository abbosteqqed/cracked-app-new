"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

export const signOut = async () => {
	try {
		await auth.api.signOut({
			headers: [],
		});
	} catch (error) {
		if (error instanceof APIError) {
			return {
				error: error.message,
			};
		}

		return {
			error:
				"An unexpected error occurred during sign up. Please try again later or contact support.",
		};
	}
};
