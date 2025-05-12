import { cn } from "@/lib/utils";
import React from "react";

interface MultipleSelectProps {
	value: string;
	options: { value: string; title: string }[];
	onChange: (val: string) => void;
	containerClassName?: string;
}

const MultipleSelect = ({
	options,
	onChange,
	value,
	containerClassName,
}: MultipleSelectProps) => {
	const handleClick = (val: string) => {
		if (value === val) {
			onChange("");
		} else {
			onChange(val);
		}
	};
	return (
		<div className={cn("grid grid-cols-2 gap-4", containerClassName)}>
			{options.map((option) => (
				<button
					type="button"
					key={option.value}
					onClick={() => handleClick(option.value)}
					className={cn(
						"w-full grid text-left bg-slate-3 border text-sm border-slate-6 px-3 py-2 rounded-md  hover:bg-slate-5",
						{
							"bg-slate-5 text-white ring-2 ring-slate-8":
								value === option.value,
						}
					)}>
					{option.title}
				</button>
			))}
		</div>
	);
};

export default MultipleSelect;
