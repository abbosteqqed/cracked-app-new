import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import React, { lazy } from "react";
const ActivePlanCard = lazy(() => import("./active-plan-card"));
const SubscriptionCards = lazy(() => import("./subscription-cards"));

const PricingClient = async() => {
	const { subscription } = await getCurrentUser();
	return (
		<>
			{!subscription || subscription.name === "Free" ? (
				<SubscriptionCards />
			) : (
				<ActivePlanCard subsription={subscription} />
			)}
		</>
	);
};

export default PricingClient;
