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
			message: "Verification email sent. Please check your inbox.",
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
