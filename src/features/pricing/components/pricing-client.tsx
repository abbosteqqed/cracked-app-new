"use client";
import { useQuery, } from "@tanstack/react-query";
import React from "react";
import { getSubscriptions } from "../actions/get-subscriptions";
import LoadingPage from "@/components/layout/loading-page";
import FormError from "@/components/fields/form-error";
import SUBSCRIPTION_PLANS from "@/lib/constants/subscription-plans";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CheckCircle} from "lucide-react";
import ActivePlanCard from "./active-plan-card";

const PricingClient = () => {
	
	const { data, isPending, error } = useQuery({
		queryKey: ["pricing"],
		queryFn: getSubscriptions,
	});
	
	if (isPending) return <LoadingPage message="Loading pricing..." />;
	if (error) return <FormError message={error.message} />;
	return (
		<>
			{!data.subsription || data.subsription.name === "Free" ? (
				<div className="py-10 max-w-7xl mx-auto w-full px-6">
					<div className="grid grid-cols-3 gap-4 mt-10">
						{SUBSCRIPTION_PLANS.map((item) => (
							<div
								key={item.id}
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
								<span className="text-xl font-semibold block mt-6">
									{item.title}
								</span>
								<p className="text-sm text-neutral-400">{item.description}</p>
								<h3 className="text-4xl mt-4 font-bold">
									${item.price}{" "}
									{item.priceText && (
										<span className="text-base font-thin">
											/{item.priceText}
										</span>
									)}
								</h3>

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
