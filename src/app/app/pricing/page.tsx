import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import PricingClient from "@/features/pricing/components/pricing-client";
import React from "react";

const PricingPage = async () => {
	const { subscription } = await getCurrentUser();
	return <PricingClient subscription={subscription} />;
};

export default PricingPage;
