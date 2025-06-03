import { usageOptions } from "@/lib/constants/onboarding";
import { cn } from "@/lib";
import React from "react";
import { ProfileDTO } from "../hooks/use-onboarding";
import { Button } from "@/components/ui/button";

interface OnboardingAgentsStepProps {
	value: string[];
	setProfile: React.Dispatch<React.SetStateAction<ProfileDTO>>;
}

const OnboardingAgentsStep = ({
	value,
	setProfile,
}: OnboardingAgentsStepProps) => {
	const handleChange = (val: string) => {
		if (value.includes(val)) {
			const filtered = value.filter((item) => item !== val);
			setProfile((prev) => ({ ...prev, usedFor: filtered }));
		} else {
			setProfile((prev) => ({ ...prev, usedFor: [...value, val] }));
		}
	};
	return (
		<div className="grid gap-3">
			{usageOptions.map((item) => (
				<Button
					key={item.title}
					type="button"
					variant="outline"
					onClick={() => {
						handleChange(item.title);
					}}
					className={cn(
						" px-4 py-3 h-auto text-sm font-medium flex justify-between",
						value.includes(item.title) &&
							" bg-white text-black  hover:bg-white/90"
					)}>
					<span>{item.title}</span>
					<span>{item.icon}</span>
				</Button>
			))}
		</div>
	);
};

export default OnboardingAgentsStep;
