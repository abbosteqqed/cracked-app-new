import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import PricingClient from "@/features/pricing/components/pricing-client";
import React, { Suspense } from "react";
import PageLoading from "./loading";

const PricingPage = async () => {
	const { subscription } = await getCurrentUser();
	return (
		<Suspense fallback={<PageLoading />}>
			<PricingClient subscription={subscription} />
		</Suspense>
	);
};

export default PricingPage;
