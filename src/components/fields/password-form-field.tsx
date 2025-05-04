/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
	FieldError,
	UseFormRegister,
	FieldValues,
	Path,
} from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFormFieldProps<TFormValues extends FieldValues> {
	label?: string;
	placeholder?: string;
	name: Path<TFormValues>;
	register: UseFormRegister<TFormValues>;
	error?: FieldError;
	className?: string;
	id?: string;
	[key: string]: any;
}

const PasswordFormField = <TFormValues extends FieldValues>({
	id,
	label,
	name,
	error,
	className,
	placeholder,
	register,
	...rest
}: PasswordFormFieldProps<TFormValues>): React.ReactElement => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const inputType = showPassword ? "text" : "password";

	const inputId = id || `password-input-${name}`;

	return (
		<div className="flex flex-col gap-1">
			{label && <Label htmlFor={inputId}>{label}</Label>}
			<div className="relative">
				<Input
					id={inputId}
					type={inputType}
					placeholder={placeholder}
					className={cn(
						"w-full pr-10",
						{
							"border-red-500 focus:border-slate-6": error,
						},
						className
					)}
					{...register(name)}
					{...rest}
				/>
				<button
					type="button"
					onClick={togglePasswordVisibility}
					className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-11 hover:text-white focus:outline-none"
					aria-label={showPassword ? "Hide password" : "Show password"}>
					{showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
				</button>
			</div>
			{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
		</div>
	);
};

export default PasswordFormField;
