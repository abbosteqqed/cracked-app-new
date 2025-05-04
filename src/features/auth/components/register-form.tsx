"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import AuthWrapper from "./auth-wrapper";
import { RegisterInput, registerSchema } from "../validations/register.schema";
import InputFormField from "@/components/fields/input-form-field";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PasswordFormField from "@/components/fields/password-form-field";

const RegisterForm = () => {
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

	const onSubmit = (data: RegisterInput) => {
		console.log(data);
	};
	return (
		<AuthWrapper
			title="Create a Cracked account"
			subtitle={
				<p className="text-base text-slate-11 font-normal mb-8 text-center sm:text-left">
					Already have an account?{" "}
					<Link
						className="text-blue-10"
						href="/signin">
						Log in
					</Link>
					.
				</p>
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
				/>
				<InputFormField
					register={register}
					label="Email"
					error={errors.email}
					type="email"
					placeholder="tim@cracked.com"
					name="name"
				/>
				<PasswordFormField
					register={register}
					name="password"
					placeholder="••••••••••••"
					label="Password"
					error={errors.password}
				/>
				<Button type="submit">Create an account</Button>
			</form>
		</AuthWrapper>
	);
};

export default RegisterForm;
