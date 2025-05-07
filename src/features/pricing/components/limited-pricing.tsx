"use client";
import React, { useEffect, useState, useTransition } from "react";
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";
import PricingCard from "./pricing-card";
import { toast } from "sonner";
import { LIMITED_PRICING } from "@/lib/constants/limited-pricing";
import { SparklesCore } from "@/components/ui/sparkless";
import { limitedTimeSubscription } from "../actions/limited-time-subscription";

const LimitedPricing = () => {
	const [isPending, startTransition] = useTransition();
	const [checkoutLink, setCheckoutLink] = useState<string | null>(null);
	useEffect(() => {
		PolarEmbedCheckout.init();
	}, [checkoutLink]);
	const handlePricingPlan = (plan: string) => {
		startTransition(() => {
			limitedTimeSubscription({ plan })
				.then((data) => {
					if (data.url) {
						setCheckoutLink(data.url);
					}
					if (data.error) {
						toast.error(data.error);
					}
				})
				.catch((e) => {
					console.log(e);
					toast.error("Something went wrongly in creating checkout.");
				});
		});
	};
	return (
		<div className="bg-black min-h-screen w-full px-6 py-20 flex justify-center z-50">
			<div className="max-w-3xl w-full flex flex-col items-center">
				<h1 className="md:text-4xl text-2xl font-medium text-center mb-4">
					Unlock Massive Savings! Limited One Time Offer!
				</h1>

				<div className="w-[40rem] h-40 relative">
					<div className="absolute inset-x-20 top-0 bg-linear-to-r from-transparent via-lime-400 to-transparent h-[2px] w-3/4 blur-xs" />
					<div className="absolute inset-x-20 top-0 bg-linear-to-r from-transparent via-lime-400 to-transparent h-px w-3/4" />
					<div className="absolute inset-x-60 top-0 bg-linear-to-r from-transparent via-lime-400 to-transparent h-[5px] w-1/4 blur-xs" />
					<div className="absolute inset-x-60 top-0 bg-linear-to-r from-transparent via-lime-400 to-transparent h-px w-1/4" />

					<SparklesCore
						background="transparent"
						minSize={0.4}
						maxSize={1}
						particleDensity={1200}
						className="w-full h-full"
						particleColor="#FFFFFF"
					/>
					<div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
				</div>
				<div className="grid grid-cols-2 gap-4 relative min-w-full mt-4">
					{LIMITED_PRICING.map((item) => (
						<PricingCard
							isPending={isPending}
							key={item.buttonText}
							main={item.main}
							benefits={item.benefits}
							buttonText={item.buttonText}
							buttonVariant={item.buttonVariant}
							buttonClick={() => handlePricingPlan(item.plan)}
						/>
					))}
				</div>
				{checkoutLink && (
					<div>
						<a
							href={checkoutLink}
							data-polar-checkout
							data-polar-checkout-theme="dark">
							Purchase
						</a>
					</div>
				)}
			</div>
		</div>
	);
};

export default LimitedPricing;
