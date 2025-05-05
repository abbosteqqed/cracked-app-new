"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState, useTransition } from "react";
import AuthWrapper from "./auth-wrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { resetPassword } from "../actions/reset-password"; // Assuming this action verifies the token and potentially resets
import { PasswordInput, passwordSchema } from "../validations/password.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import PasswordFormField from "@/components/fields/password-form-field";

const ResetPassword = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();
	const token = searchParams.get("token");
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<PasswordInput>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: PasswordInput) => {
		setErrorMessage(null);
		setSuccessMessage(null);
		startTransition(() => {
			resetPassword({ newPassword: data.password, token })
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
						"An unexpected issue occurred. Please check your connection and try again."
					);
				});
		});
	};
	useEffect(() => {
		if (!token) {
			setErrorMessage(
				"Password reset token is missing. Please use the complete link from your email."
			);
			return;
		}
	}, [token, router]);

	return (
		<AuthWrapper
			title="Reset Password"
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
			<>
				{successMessage ? (
					<div className="flex items-center justify-between py-6 flex-col w-full gap-4">
						<p className="text-center text-green-500">{successMessage}</p>
						<Button
							disabled={isPending}
							onClick={() => router.push("/auth/signin")}
							className="w-full"
							type="button">
							<span>Proceed to Login</span>
							<ArrowRight className="size-4 ml-2" />
						</Button>
					</div>
				) : (
					<form
						className="w-full flex flex-col gap-4"
						onSubmit={handleSubmit(onSubmit)}>
						<PasswordFormField
							register={register}
							name="password"
							placeholder="••••••••••••"
							label="New Password"
							error={errors.password}
							disabled={isPending}
						/>
						<PasswordFormField
							register={register}
							name="confirmPassword"
							placeholder="••••••••••••"
							label="Confirm Password"
							error={errors.confirmPassword}
							disabled={isPending}
						/>
						<ResetPasswordError error={errorMessage} />
						<Button
							disabled={isPending}
							type="submit">
							<span>Reset Password</span>
						</Button>
					</form>
				)}
			</>
		</AuthWrapper>
	);
};

const ResetPasswordError = ({ error }: { error: string | null }) => {
	if (!error) return null;
	if (error === "token_expired") {
		return (
			<p className="text-red-500 text-sm mt-1">
				Password reset token expired!{" "}
				<Link
					className="text-blue-10"
					href="/auth/forgot-password">
					Go to forgot password
				</Link>
			</p>
		);
	}

	return <p className="text-red-500 text-sm mt-1">{error}</p>;
};

// Suspense boundary for useSearchParams
const ResetPasswordForm = () => {
	return (
		<Suspense>
			<ResetPassword />
		</Suspense>
	);
};

export default ResetPasswordForm;
