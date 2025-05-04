import { twoFAHTML } from "@/components/email/2fa-email-template";
import { emailConfirmEmailHTML } from "@/components/email/email-verification";
import { otpHTML } from "@/components/email/otp-email-template";
import { resetPasswordEmailHTML } from "@/components/email/reset-password-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const from = `noreply@updates.crcked.com`;

export const sendVerificationEmail = async (email: string, token: string) => {
	try {
		const link = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/auth/new-verification?token=${token}`;
		const html = await emailConfirmEmailHTML({ link });

		await resend.emails.send({
			from,
			to: email,
			subject: "Confirm Your Email",
			html: html,
		});
	} catch (e) {
		console.log(e);
	}
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
	try {
		const link = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/auth/new-password?token=${token}`;

		const html = await resetPasswordEmailHTML({ link });

		await resend.emails.send({
			from,
			to: email,
			subject: "Reset Password",
			html,
		});
	} catch (e) {
		console.log(e);
	}
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
	try {
		const html = await twoFAHTML({ code: token });
		await resend.emails.send({
			from,
			to: email,
			subject: "2FA Code",
			html,
		});
	} catch (e) {
		console.log(e);
	}
};

export const sendOtpEmail = async (email: string, token: string) => {
	try {
		const html = await otpHTML({ code: token });
		await resend.emails.send({
			from,
			to: email,
			subject: "OTP Code",
			html,
		});
	} catch (e) {
		console.log(e);
	}
};
