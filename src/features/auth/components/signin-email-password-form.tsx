/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useTransition } from "react";
import AuthWrapper from "./auth-wrapper";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginInput, loginSchema } from "../validations/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinEmailPassword } from "../actions/signin-email-password";
import InputFormField from "@/components/fields/input-form-field";
import PasswordFormField from "@/components/fields/password-form-field";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SUCCESS_LOGIN_REDIRECT } from "@/lib/constants/links";

const SigninEmailPasswordForm = () => {
	const [isPending, startTransition] = useTransition();
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginInput) => {
		startTransition(() => {
			signinEmailPassword({
				email: data.email,
				password: data.password,
			})
				.then((res) => {
					if (res.error) {
						setErrorMessage(res.error);
					}
					if (res.user) {
						reset();
						router.replace(SUCCESS_LOGIN_REDIRECT);
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
			}
			showSocials>
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
				<PasswordFormField
					register={register}
					name="password"
					placeholder="••••••••••••"
					label="Password"
					error={errors.password}
					disabled={isPending}
					showForgotPassword
				/>
				{errorMessage && (
					<p className="text-red-500 text-sm mt-1">{errorMessage}</p>
				)}
				<Button
					disabled={isPending}
					type="submit">
					<span>Continue</span>
					<ArrowRight className="size-4" />
				</Button>
			</form>
		</AuthWrapper>
	);
};

export default SigninEmailPasswordForm;
