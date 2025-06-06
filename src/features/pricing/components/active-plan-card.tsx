"use client";
import React from "react";
import { SubscriptionStatus } from "@prisma/client";
import SUBSCRIPTION_PLANS from "@/lib/constants/subscription-plans";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActivePricing } from "../hooks/use-active-pricing";
import { formatDate } from "@/lib/format-date";
interface ActivatePlanCardProps {
	subsription: {
		name: string;
		status: SubscriptionStatus;
		endDate: Date | null;
		renewalDate: Date | null;
	};
}

const ActivePlanCard = ({ subsription }: ActivatePlanCardProps) => {
	const { isPending, handleCancel, handelUnCancel } = useActivePricing();
	return (
		<div className="max-w-5xl mx-auto pt-10">
			<div className="bg-slate-2 border border-slate-3 p-6 rounded-xl flex md:flex-row flex-col gap-6 justify-between w-full mt-10">
				<div className="flex flex-col">
					<div className="flex gap-2 items-center">
						<h2 className="text-2xl font-semibold">{subsription.name} Plan</h2>{" "}
						-
						{subsription.status === "ACTIVE" ? (
							<div className="px-2 py-1 border border-green-700 bg-green-500/10 rounded-4xl w-max text-xs h-max">
								{subsription.status}
							</div>
						) : (
							<div className="px-2 py-1 border border-slate-6 bg-slate-4 rounded-4xl w-max text-xs h-max">
								{subsription.status}
							</div>
						)}
					</div>
					<span className="text-xl font-medium mt-6">Benefits:</span>
					{SUBSCRIPTION_PLANS.find(
						(item) => item.title === subsription?.name
					) && (
						<ul className="flex flex-col">
							{SUBSCRIPTION_PLANS.find(
								(item) => item.title === subsription?.name
							)?.benefits.map((benifit) => (
								<li
									key={benifit}
									className="flex items-center gap-3">
									<CheckIcon className="text-green-500 size-4" />
									<span className="text-white/70">{benifit}</span>
								</li>
							))}
						</ul>
					)}
				</div>
				<div className="flex flex-col justify-between">
					{subsription.endDate && (
						<p className="text-white/70 text-sm">
							Subscription Ends Date: {formatDate(subsription.endDate)}
						</p>
					)}
					{subsription.renewalDate && (
						<p className="text-white/70 text-sm">
							Subscription Renewal Date: {formatDate(subsription.renewalDate)}
						</p>
					)}
					{subsription.status === "ACTIVE" ? (
						<Button
							type="button"
							onClick={handleCancel}
							disabled={isPending}
							variant="outline">
							Cancel
						</Button>
					) : (
						<Button
							type="button"
							onClick={handelUnCancel}
							disabled={isPending}>
							Activate
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ActivePlanCard;
