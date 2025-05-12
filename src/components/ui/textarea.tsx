import * as React from "react";


import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva("", {
	variants: {
		variant: {
			default:
				"flex min-h-10 w-full rounded-md border border-slate-6 bg-slate-3 focus-visible:ring-slate-7 px-3 py-2 text-sm text-white outline-hidden placeholder:text-white/50 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
			secondary:
				"bg-[rgba(37,37,37,0.3)] px-3 outline-hidden text-sm py-2 min-h-10 rounded-md placeholder:text-white/50 w-full",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, variant, ...props }, ref) => {
		return (
			<textarea
				className={cn(textareaVariants({ className, variant }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Textarea.displayName = "Textarea";

export { Textarea };
