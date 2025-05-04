"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

export const signUpEmail = async (data: {
	email: string;
	password: string;
	name: string;
}) => {
	try {
		const { user } = await auth.api.signUpEmail({
			body: data,
		});

		await auth.api.sendVerificationEmail({
			body: {
				email: user.email,
			},
		});

		return {
			success: true,
			message:
				"A verification email has been sent to your inbox. Please check your email to complete your registration.",
		};
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
