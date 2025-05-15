"use client";
import React, { useState, useTransition } from "react";
import AuthWrapper from "./auth-wrapper";
import { useForm } from "react-hook-form";
import { EamilInput, emailSchema } from "../validations/email.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import InputFormField from "@/components/fields/input-form-field";
import { ArrowRight } from "lucide-react";
import { forgotPassword as sendForgotPassword } from "../actions/forgot-password";
import Link from "next/link";

const ForgotPasswordForm = () => {
	const [isPending, startTransition] = useTransition();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<EamilInput>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (data: EamilInput) => {
		setErrorMessage(null); // Clear previous errors on new submission
		setSuccessMessage(null); // Clear previous success messages
		startTransition(() => {
			sendForgotPassword(data.email)
				.then((res) => {
					if (res.error) {
						setErrorMessage(res.error);
					}
					if (res.success) {
						setSuccessMessage(res.message);
						reset(); // Clear the form on success
					}
				})
				.catch(() => {
					// This catch handles unexpected client-side errors during the action call
					setErrorMessage(
						"An unexpected issue occurred. Please check your connection and try again."
					);
				});
		});
	};

	return (
		<AuthWrapper
			title="Reset Your Password"
			subtitle={
				<>
					Remember your password?{" "}
					<Link
						className="text-blue-10"
						href="/auth/signin">
						Sign In
					</Link>
					.
				</>
			}>
			{successMessage ? (
				<div className="flex items-center justify-between py-6 flex-col w-full gap-4">
					<p className="text-center text-green-500">{successMessage}</p>
					<a
						href="/auth/signin"
						className="w-full">
						<Button
							disabled={isPending}
							className="w-full"
							type="button">
							<span>Return to Login</span>
							<ArrowRight className="size-4 ml-2" />
						</Button>
					</a>
				</div>
			) : (
				<form
					className="w-full flex flex-col gap-4"
					onSubmit={handleSubmit(onSubmit)}>
					<InputFormField
						register={register}
						label="Email Address"
						error={errors.email}
						type="email"
						placeholder="name@example.com"
						name="email"
						disabled={isPending}
					/>
					{errorMessage && (
						<p className="text-red-500 text-sm mt-1 text-center">
							{errorMessage}
						</p>
					)}
					<Button
						disabled={isPending}
						type="submit">
						{isPending ? "Sending Link..." : "Send Reset Link"}
					</Button>
				</form>
			)}
		</AuthWrapper>
	);
};

export default ForgotPasswordForm;
