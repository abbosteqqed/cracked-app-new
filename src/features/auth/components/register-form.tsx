"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import AuthWrapper from "./auth-wrapper";
import { RegisterInput, registerSchema } from "../validations/register.schema";
import InputFormField from "@/components/fields/input-form-field";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PasswordFormField from "@/components/fields/password-form-field";
import { signUpEmail } from "../actions/register";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: RegisterInput) => {
		startTransition(() => {
			signUpEmail({
				email: data.email,
				password: data.password,
				name: data.name,
			})
				.then((data) => {
					if (data.error) {
						setErrorMessage(data.error);
					}
					if (data.success) {
						reset();
						router.replace("/");
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
			title="Create a Cracked account"
			subtitle={
				<>
					Already have an account?{" "}
					<Link
						className="text-blue-10"
						href="/signin">
						Log in
					</Link>
					.
				</>
			}>
			<form
				className="w-full flex flex-col gap-4"
				onSubmit={handleSubmit(onSubmit)}>
				<InputFormField
					register={register}
					label="Name"
					error={errors.name}
					type="text"
					placeholder="John Doe"
					name="name"
					disabled={isPending}
				/>
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
				/>
				{errorMessage && (
					<p className="text-red-500 text-sm mt-1">{errorMessage}</p>
				)}
				<Button
					disabled={isPending}
					type="submit">
					Create an account
				</Button>
			</form>
		</AuthWrapper>
	);
};

export default RegisterForm;
