"use client";
import React, { useState, useTransition } from "react";
import AuthWrapper from "./auth-wrapper";
import { useForm } from "react-hook-form";
import { EamilInput, emailSchema } from "../validations/email.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import InputFormField from "@/components/fields/input-form-field";
import { sendEmailVerification } from "../actions/send-email-verification";
import { ArrowRight } from "lucide-react";

const EmailVerificationForm = () => {
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
		startTransition(() => {
			sendEmailVerification(data.email)
				.then((res) => {
					if (res.error) {
						setErrorMessage(res.error);
					}
					if (res.success) {
						setSuccessMessage(res.message);
						reset();
					}
				})
				.catch(() => {
					setErrorMessage(
						"An unexpected error occurred. Please try again later."
					);
				});
		});
	};
	return (
		<AuthWrapper
			title="Email verification"
			subtitle={<>Send email verification by entering email</>}>
			{successMessage ? (
				<div className="flex items-center justify-between py-6 flex-col w-full gap-4">
					<p className="text-center text-green-500">{successMessage}</p>
					<a href="/auth/signin">
						<Button
							disabled={isPending}
							className="w-full"
							type="button">
							<span>Go to Login</span>
							<ArrowRight className="size-4" />
						</Button>
					</a>
				</div>
			) : (
				<form
					className="w-full flex flex-col gap-4"
					onSubmit={handleSubmit(onSubmit)}>
					<InputFormField
						register={register}
						label="Email"
						error={errors.email}
						type="email"
						placeholder="tim@cracked.com"
						name="email"
						disabled={isPending}
					/>
					{errorMessage && (
						<p className="text-red-500 text-sm mt-1">{errorMessage}</p>
					)}
					<Button
						disabled={isPending}
						type="submit">
						Send Email Verification
					</Button>
				</form>
			)}
		</AuthWrapper>
	);
};

export default EmailVerificationForm;
