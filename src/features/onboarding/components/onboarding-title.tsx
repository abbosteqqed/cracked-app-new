import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

const OnboardingTitle = ({
	children,
	className,
	...props
}: HTMLAttributes<HTMLHeadingElement>) => {
	return (
		<h1
			className={cn("font-medium text-2xl text-center", className)}
			{...props}>
			{children}
		</h1>
	);
};

export default OnboardingTitle;
