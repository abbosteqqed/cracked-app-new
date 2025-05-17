import PricingHeader from "@/components/layout/pricing-header";
import PricingClient from "@/features/pricing/components/pricing-client";
import PricingLoading from "@/features/pricing/components/pricing-loading";
import React, { Suspense } from "react";

const PricingPage = async () => {
	return (
		<div className="max-w-5xl w-full mx-auto pt-10">
			<PricingHeader
				title="Manage Your AI Advantage"
				description="Simple pricing for powerful AI agents. Find the perfect fit to grow
					your business."
			/>
			<Suspense fallback={<PricingLoading />}>
				<PricingClient />
			</Suspense>
		</div>
	);
};

export default PricingPage;
