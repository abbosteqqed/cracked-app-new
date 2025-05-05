/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useTransition } from "react";
import AuthWrapper from "./auth-wrapper";
import { useForm } from "react-hook-form";
import {
	EmailAndOtpInput,
	emailAndOtpSchema,
} from "../validations/email-otp.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import InputFormField from "@/components/fields/input-form-field";
import { useRouter } from "next/navigation";
import { sendSigninOtp, signinWithOtp } from "../actions/signin-otp";
import { SUCCESS_LOGIN_REDIRECT } from "@/lib/constants/links";
import Link from "next/link";

const SignInWithOtpForm = () => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [showOtp, setShowOtp] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		reset,
	} = useForm<EmailAndOtpInput>({
		resolver: zodResolver(emailAndOtpSchema),
	});

	const onSubmit = async (data: EmailAndOtpInput) => {
		setErrorMessage(null);

		if (!showOtp) {
			startTransition(() => {
				sendSigninOtp({ email: data.email })
					.then((res) => {
						if (res.error) {
							setErrorMessage(res.error);
						}
						if (res.success) {
							setShowOtp(true);
						}
					})
					.catch(() => {
						setErrorMessage(
							"An unexpected error occurred while sending the OTP. Please try again."
						);
					});
			});
		} else {
			const email = data.email;

			if (data.otp) {
				startTransition(() => {
					signinWithOtp({ email: email, otp: data.otp as string })
						.then((res) => {
							if (res.error) {
								setErrorMessage(res.error);
							}
							if (res.success) {
								router.replace(SUCCESS_LOGIN_REDIRECT);
								setShowOtp(false);
								reset();
							}
						})
						.catch(() => {
							setErrorMessage(
								"An unexpected error occurred during sign in. Please try again."
							);
						});
				});
			} else {
				setError("otp", { message: "One-time password is required." });
			}
		}
	};

	return (
		<AuthWrapper
			title="Sign in to Cracked"
			subtitle={
				<>
					Don't have an account?{" "}
					<Link
						className="text-blue-10"
						href="/auth/signup">
						Sign Up
					</Link>
					.
				</>
			}>
			<form
				className="w-full flex flex-col gap-4"
				onSubmit={handleSubmit(onSubmit)}>
				{!showOtp && (
					<InputFormField
						register={register}
						label="Email Address"
						error={errors.email}
						type="email"
						placeholder="name@example.com"
						name="email"
						disabled={isPending || showOtp}
					/>
				)}

				{showOtp && (
					<InputFormField
						register={register}
						label="One-Time Password (OTP)"
						error={errors.otp}
						type="text"
						placeholder="Enter your 6-digit code"
						name="otp"
						disabled={isPending}
					/>
				)}

				{errorMessage && (
					<p className="text-red-500 text-sm mt-1 text-center">
						{errorMessage}
					</p>
				)}

				<Button
					disabled={isPending}
					type="submit">
					{isPending
						? showOtp
							? "Verifying OTP..."
							: "Sending OTP..."
						: showOtp
							? "Sign In with OTP"
							: "Send One-Time Password"}
				</Button>
			</form>
		</AuthWrapper>
	);
};

export default SignInWithOtpForm;
