import React from "react";
import OnboardingTitle from "./onboarding-title";
import { cn } from "@/lib";
import { Button } from "@/components/ui/button";

interface OnBoardingWrapperProps {
	step: number;
	isPending: boolean;
	children: React.ReactNode;
	onClickNext: () => void;
	onClickPrev: () => void;
	isNextDisabled: boolean;
}

const OnBoardingWrapper = ({
	step,
	isPending,
	children,
	onClickNext,
	onClickPrev,
	isNextDisabled,
}: OnBoardingWrapperProps) => {
	const renderTitle = () => {
		switch (step) {
			case 1:
				return (
					<>
						<span className="text-white/65">Let&apos;s get you set up.</span>
						<br />
						<span>We&apos;ll ask some questions to train the AI.</span>
					</>
				);
			case 2:
				return "How old are you?";
			case 3:
				return "Are you male or female?";
			case 4:
				return "What's your preferred language?";
			case 5:
				return "What will you mostly use agents for?";
			default:
				return null;
		}
	};
	return (
		<div className="relative max-w-xs w-full z-20">
			<div className="grid min-w-full gap-y-10">
				<OnboardingTitle
					className={cn({
						"text-left": step === 1,
					})}>
					{renderTitle()}
				</OnboardingTitle>
				{children}
				{step === 1 && (
					<Button
						disabled={isPending}
						onClick={onClickNext}
						type="button"
						variant="secondary"
						className="max-w-[256px]">
						Let&apos;s go
					</Button>
				)}
				{step > 1 && (
					<div className="grid grid-cols-2 gap-x-4">
						<Button
							disabled={isPending}
							onClick={onClickPrev}
							type="button"
							variant="ghost">
							Back
						</Button>
						<Button
							disabled={isPending || isNextDisabled}
							onClick={onClickNext}
							type="button"
							variant="secondary">
							Continue
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default OnBoardingWrapper;
