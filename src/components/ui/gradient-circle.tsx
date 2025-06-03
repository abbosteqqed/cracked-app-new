import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

const GradientCircle = ({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn(
				"bg-linear-to-b from-[#0FCCAC] to-[#F3AE5F] h-9 w-9 rounded-full",
				className
			)}
			{...props}
		/>
	);
};

export default GradientCircle;
