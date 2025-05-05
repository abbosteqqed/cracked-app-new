import { cn } from "@/lib/utils";
import React from "react";

const OnboardingPending = () => {
	return (
		<div
			className={cn(
				"items-center gap-4 animate-pulse flex justify-center relative z-20"
			)}>
			<div className="size-8 shrink-0  border-[3px] rounded-full border-brand" />
			<h1 className="font-medium text-base text-center text-white">
				Creating your profile...
			</h1>
		</div>
	);
};

export default OnboardingPending;
