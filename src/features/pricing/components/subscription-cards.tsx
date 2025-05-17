"use client";
import SUBSCRIPTION_PLANS from "@/lib/constants/subscription-plans";
import React, { useTransition } from "react";
import PricingCardGradient from "./priciing-card-gradient";
import { upgradeSubscription } from "../actions/upgrade-subscription";
import { toast } from "sonner";
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";

const SubscriptionCards = () => {
	const [isPending, startTransition] = useTransition();

	const handleSubscribe = async (id: string) => {
		startTransition(() => {
			upgradeSubscription(id)
				.then((data) => {
					PolarEmbedCheckout.create(data.url, "dark");
				})
				.catch((error) => {
					toast.error(error.message);
				});
		});
	};
	return (
		<div>
			<div className="grid grid-cols-3 gap-4 mt-10">
				{SUBSCRIPTION_PLANS.map((item) => (
					<PricingCardGradient
						key={item.id}
						item={item}
						isPending={isPending}
						handleSubscribe={handleSubscribe}
					/>
				))}
			</div>
		</div>
	);
};

export default SubscriptionCards;
