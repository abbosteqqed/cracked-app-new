import { CheckCircle } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";

export interface PricingCardProps {
	main: PricingCardTopProps;
	benefits: string[];
	buttonVariant: "gradient" | "simple";
	buttonClick: () => void;
	buttonText: string;
	isPending: boolean;
}

const PricingCard = ({
	main,
	benefits,
	buttonVariant = "simple",
	buttonClick,
	buttonText,
	isPending,
}: PricingCardProps) => {
	return (
		<div className="bg-black border flex flex-col justify-between border-white/10 w-full rounded-2xl p-6">
			<PricingCardTop {...main} />
			{benefits && (
				<div className="flex flex-col">
					<div className="flex flex-col mt-4 gap-2">
						{benefits.map((benefit) => (
							<div
								key={benefit + main.planName}
								className="flex items-center gap-2">
								<CheckCircle className="size-4" /> <span>{benefit}</span>
							</div>
						))}
					</div>
				</div>
			)}
			{buttonVariant === "gradient" ? (
				<RainbowButton
					disabled={isPending}
					type="button"
					onClick={buttonClick}
					className="mt-6">
					{isPending ? `${buttonText}...` : buttonText}
				</RainbowButton>
			) : (
				<Button
					type="button"
					disabled={isPending}
					onClick={buttonClick}
					variant="secondary"
					className="mt-6 w-full">
					{isPending ? `${buttonText}...` : buttonText}
				</Button>
			)}
		</div>
	);
};

interface PricingCardTopProps {
	planName: string;
	planSlogan: string;
	pricing: string;
	pricingDescription: string;
}

const PricingCardTop = ({
	planName,
	planSlogan,
	pricing,
	pricingDescription,
}: PricingCardTopProps) => {
	return (
		<div className="flex flex-col gap-2 pb-4 border-b border-b-neutral-800">
			<h4 className="text-lg font-medium text-lime-500">{planName}</h4>
			<p className="text-sm text-neutral-500 mb-2">{planSlogan}</p>
			<h3 className="text-2xl font-bold">{pricing}</h3>
			<p className="text-sm text-neutral-500 mb-1">{pricingDescription}</p>
		</div>
	);
};

export default PricingCard;
