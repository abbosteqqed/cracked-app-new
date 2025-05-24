import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { polar as betterPolar } from "@polar-sh/better-auth";
import {
	sendOtpEmail,
	sendPasswordResetEmail,
	sendVerificationEmail,
} from "./services/mail.service";
import db from "./db";
import { polar } from "./polar";
import { env } from "./config";

export const auth = betterAuth({
	appName: "cracked",
	baseURL: env.NEXT_PUBLIC_WEBSITE_URL,
	database: prismaAdapter(db, {
		provider: "postgresql",
	}),

	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		requireEmailVerification: true,
		sendResetPassword: async (data) => {
			await sendPasswordResetEmail(data.user.email, data.token);
		},
	},

	emailVerification: {
		sendOnSignUp: true,
		sendVerificationEmail: async (data) => {
			const { token } = data;
			await sendVerificationEmail(data.user.email, token);
		},
	},

	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID!,
			clientSecret: env.GOOGLE_CLIENT_SECRET!,
		},
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60,
		},
	},
	plugins: [
		nextCookies(),
		expo(),
		emailOTP({
			async sendVerificationOTP({ email, otp, type }) {
				if (type === "sign-in") {
					await sendOtpEmail(email, otp);
				}
			},
		}),
		betterPolar({
			client: polar,
			createCustomerOnSignUp: true,
			enableCustomerPortal: true,
		}),
	],
});
