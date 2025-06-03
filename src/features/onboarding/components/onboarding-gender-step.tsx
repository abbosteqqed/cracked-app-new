import { genderOptions } from "@/lib/constants/onboarding";
import { ProfileDTO } from "../hooks/use-onboarding";
import { cn } from "@/lib";
import React from "react";
import { Button } from "@/components/ui/button";

interface OnboardingGenderStepProps {
	value: string | null;
	setProfile: React.Dispatch<React.SetStateAction<ProfileDTO>>;
}

const OnboardingGenderStep = ({
	setProfile,
	value,
}: OnboardingGenderStepProps) => {
	return (
		<div className="grid gap-3">
			{genderOptions.map((gender) => (
				<Button
					key={gender.title}
					type="button"
					variant="outline"
					onClick={() => {
						setProfile((prev) => ({ ...prev, gender: gender.value }));
					}}
					className={cn(
						"px-4 py-3 text-sm font-medium h-auto",
						gender.value == value && " bg-white text-black  hover:bg-white"
					)}>
					{gender.title}
				</Button>
			))}
		</div>
	);
};

export default OnboardingGenderStep;
