import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"border-slate-6 bg-slate-3 text-slate-12 focus-visible:ring-slate-7 transition ease-in-out duration-200 placeholder:text-slate-11 h-10 rounded-md px-3 text-base sm:text-sm relative w-full select-none appearance-none border  outline-none focus-visible:ring-2",
				className
			)}
			{...props}
		/>
	);
}

export { Input };
