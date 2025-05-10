import { RainbowButton } from "@/components/ui/rainbow-button";
import { PricingPlan } from "@/lib/constants/subscription-plans";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const PricingCardGradient = ({
	item,
	isPending,
	handleSubscribe,
}: {
	item: PricingPlan;
	isPending: boolean;
	handleSubscribe: (id: string) => Promise<void>;
}) => {
	return (
		<div
			className={cn(
				"w-full min-h-[400px] rounded-2xl backdrop-blur-3xl px-6 py-10 bg-linear-to-br from-white/[0.06] via-white/[0.01] to-white/[0.03]",
				{
					"bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.04)_50%,rgba(255,255,255,0.07)_100%)]":
						item.isPrimary,
				}
			)}>
			<Image
				src="/images/circle.svg"
				height={40}
				width={40}
				alt="Circle"
			/>
			<span className="text-xl font-semibold block mt-6">{item.title}</span>
			<p className="text-sm text-neutral-400">{item.description}</p>
			<h3 className="text-4xl mt-4 font-bold">
				${item.price}{" "}
				{item.priceText && (
					<span className="text-base font-thin">/{item.priceText}</span>
				)}
			</h3>
			{item.title.toLowerCase() === "free" && (
				<Button
					disabled
					variant="outline"
					className="w-full mt-6">
					Current Plan
				</Button>
			)}
			{item.title.toLowerCase() === "base" && (
				<RainbowButton
					disabled={isPending}
					onClick={() => handleSubscribe(item.productId)}
					className="w-full mt-6">
					Upgrade to Base
				</RainbowButton>
			)}
			{item.title.toLowerCase() === "insanity" && (
				<Button
					disabled={isPending}
					onClick={() => handleSubscribe(item.productId)}
					className="w-full mt-6">
					Upgrade to Insanity
				</Button>
			)}
			<div className="bg-white/20 w-full h-[1px] my-10"></div>
			<div className="flex flex-col">
				<span className="text-lg font-medium block mb-3">
					What will you get
				</span>
				<div className="flex flex-col gap-2">
					{item.benefits.map((benifit) => (
						<div
							key={benifit}
							className="flex items-center gap-3 text-neutral-100">
							<CheckCircle className="size-4 min-h-4 min-w-4" />
							<span>{benifit}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PricingCardGradient;
