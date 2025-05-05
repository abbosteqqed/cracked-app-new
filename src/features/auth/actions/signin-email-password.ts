"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

export const signinEmailPassword = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	try {
		const res = await auth.api.signInEmail({
			body: {
				email,
				password,
			},
		});
		return {
			user: res.user,
		};
	} catch (error) {
		if (error instanceof APIError) {
			return {
				error: error.message,
			};
		}

		console.log(error);

		return {
			error: "An unexpected error occurred. Please try again later.",
		};
	}
};
