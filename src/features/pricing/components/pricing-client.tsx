"use client";
import { useMutation } from "@tanstack/react-query";
import React, { lazy, Suspense } from "react";
import SUBSCRIPTION_PLANS from "@/lib/constants/subscription-plans";
import { toast } from "sonner";
import { upgradeSubscription } from "../actions/upgrade-subscription";
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";
import { SubscriptionStatus } from "@prisma/client";

const ActivePlanCard = lazy(() => import("./active-plan-card"));

const PricingCardGradient = lazy(() => import("./priciing-card-gradient"));

const PricingClient = ({
	subscription,
}: {
	subscription: {
		status: SubscriptionStatus;
		name: string;
		endDate: Date | null;
	} | null;
}) => {
	const { mutateAsync: subscribePlan, isPending: subscribePending } =
		useMutation({
			mutationFn: upgradeSubscription,
			onSuccess: (data) => {
				PolarEmbedCheckout.create(data.url, "dark");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});

	const handleSubscribe = async (id: string) => {
		await subscribePlan(id);
	};

	return (
		<>
			{!subscription || subscription.name === "Free" ? (
				<div className="py-10 max-w-7xl mx-auto w-full px-6">
					<h1 className="text-transparent mb-1 bg-clip-text bg-linear-to-br from-white to-white/70 md:text-6xl md:leading-[1.3] text-3xl font-bold text-center">
						Pricing Plans
					</h1>
					<p className="max-w-[500px] text-center mx-auto text-sm text-white/50">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
						veritatis libero suscipit magni rerum, numquam quidem hic impedit!
						Facilis, ab.
					</p>
					<Suspense>
						<div className="grid grid-cols-3 gap-4 mt-10">
							{SUBSCRIPTION_PLANS.map((item) => (
								<PricingCardGradient
									key={item.id}
									item={item}
									isPending={subscribePending}
									handleSubscribe={handleSubscribe}
								/>
							))}
						</div>
					</Suspense>
				</div>
			) : (
				<Suspense>
					<ActivePlanCard subsription={subscription} />
				</Suspense>
			)}
		</>
	);
};

export default PricingClient;
