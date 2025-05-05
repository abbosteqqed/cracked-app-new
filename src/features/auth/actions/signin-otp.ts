"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

export const sendSigninOtp = async ({ email }: { email: string }) => {
	try {
		await auth.api.sendVerificationOTP({
			body: {
				email,
				type: "sign-in",
			},
		});
		return {
			success: true,
			message: `To sign in OTP send your ${email}`,
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

export const signinWithOtp = async ({
	email,
	otp,
}: {
	email: string;
	otp: string;
}) => {
	try {
		await auth.api.signInEmailOTP({
			body: {
				email,
				otp,
			},
		});

		return {
			success: true,
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
