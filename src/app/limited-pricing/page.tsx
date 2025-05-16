import LoadingPage from "@/components/layout/loading-page";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import LimitedPricing from "@/features/pricing/components/limited-pricing";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const LimitedPricingPage = async () => {
	const user = await getCurrentUser();
	if (user.subscription) {
		return redirect("/appp");
	}
	return (
		<Suspense fallback={<LoadingPage message="Limited pricing..." />}>
			<LimitedPricing />
		</Suspense>
	);
};

export default LimitedPricingPage;
