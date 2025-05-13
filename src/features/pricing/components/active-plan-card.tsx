"use client";
import React from "react";
import { SubscriptionStatus } from "@prisma/client";
import SUBSCRIPTION_PLANS from "@/lib/constants/subscription-plans";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActivePricing } from "../hooks/use-active-pricing";
interface ActivatePlanCardProps {
	subsription: {
		name: string;
		status: SubscriptionStatus;
		endDate: Date | null;
	};
}

const ActivePlanCard = ({ subsription }: ActivatePlanCardProps) => {
	const { isPending, handleCancel, handelUnCancel } = useActivePricing();
	return (
		<div className="max-w-5xl mx-auto px-6 pt-10">
			<h1 className="text-transparent mb-1 bg-clip-text bg-linear-to-br from-white to-white/70 md:text-6xl md:leading-[1.3] text-3xl font-bold text-center">
				Your Active Plan
			</h1>
			<p className="max-w-[500px] text-center mx-auto text-sm text-white/50">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
				veritatis libero suscipit magni rerum, numquam quidem hic impedit!
				Facilis, ab.
			</p>
			<div className="bg-slate-2 border border-slate-3 p-6 rounded-xl flex justify-between max-w-2xl mt-10">
				<div className="flex flex-col gap-6">
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
					{SUBSCRIPTION_PLANS.find(
						(item) => item.title === subsription?.name
					) && (
						<div className="flex flex-col">
							{SUBSCRIPTION_PLANS.find(
								(item) => item.title === subsription?.name
							)?.benefits.map((benifit) => (
								<div
									key={benifit}
									className="flex items-center gap-3">
									<CheckIcon className="text-green-500 size-4" />
									<span>{benifit}</span>
								</div>
							))}
						</div>
					)}
				</div>
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
	);
};

export default ActivePlanCard;
