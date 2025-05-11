"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { getSubscriptions } from "../actions/get-subscriptions";
import LoadingPage from "@/components/layout/loading-page";
import FormError from "@/components/fields/form-error";
import SUBSCRIPTION_PLANS from "@/lib/constants/subscription-plans";
import { toast } from "sonner";
import { upgradeSubscription } from "../actions/upgrade-subscription";
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";
import dynamic from "next/dynamic";

const ActivePlanCard = dynamic(() => import("./active-plan-card"), {
	ssr: false,
});
const PricingCard = dynamic(() => import("./priciing-card-gradient"), {
	ssr: false,
});

const PricingClient = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ["pricing"],
		queryFn: getSubscriptions,
	});

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

	if (isPending) return <LoadingPage message="Loading pricing..." />;
	if (error) return <FormError message={error.message} />;
	return (
		<>
			{!data.subsription || data.subsription.name === "Free" ? (
				<div className="py-10 max-w-7xl mx-auto w-full px-6">
					<h1 className="text-transparent mb-1 bg-clip-text bg-linear-to-br from-white to-white/70 md:text-6xl md:leading-[1.3] text-3xl font-bold text-center">
						Pricing Plans
					</h1>
					<p className="max-w-[500px] text-center mx-auto text-sm text-white/50">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
						veritatis libero suscipit magni rerum, numquam quidem hic impedit!
						Facilis, ab.
					</p>
					<div className="grid grid-cols-3 gap-4 mt-10">
						{SUBSCRIPTION_PLANS.map((item) => (
							<PricingCard
								key={item.id}
								item={item}
								isPending={subscribePending}
								handleSubscribe={handleSubscribe}
							/>
						))}
					</div>
				</div>
			) : (
				<ActivePlanCard subsription={data.subsription} />
			)}
		</>
	);
};

export default PricingClient;
