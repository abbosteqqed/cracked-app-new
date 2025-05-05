import React from "react";
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface InputFormFieldProps<TFormValues extends FieldValues> {
	label?: string;
	type: React.HTMLInputTypeAttribute;
	placeholder?: string;
	name: Path<TFormValues>;
	register: UseFormRegister<TFormValues>;
	error?: FieldError;
	className?: string;
	id?: string;
	disabled?: boolean;
}

const InputFormField = <TFormValues extends FieldValues>({
	id,
	label,
	name,
	type,
	error,
	className,
	placeholder,
	register,
	disabled,
}: InputFormFieldProps<TFormValues>) => {
	return (
		<div className="flex flex-col gap-1">
			{label && <Label htmlFor={id}>{label}</Label>}
			<Input
				id={id}
				type={type}
				disabled={disabled}
				placeholder={placeholder}
				className={cn(
					"w-full",
					{
						"border-red-500 focus:border-slate-6": error,
					},
					className
				)}
				{...register(name)}
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
		</div>
	);
};

export default InputFormField;
