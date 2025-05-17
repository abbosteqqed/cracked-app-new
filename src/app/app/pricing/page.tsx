import PricingClient from "@/features/pricing/components/pricing-client";
import PricingLoading from "@/features/pricing/components/pricing-loading";
import React, { Suspense } from "react";

const PricingPage = async () => {
	return (
		<div className="max-w-5xl w-full mx-auto pt-10">
			<div className="flex w-full items-center justify-center flex-col">
				<h1 className="text-transparent max-w-xl mb-1 bg-clip-text bg-linear-to-br from-white to-white/70 md:text-6xl md:leading-[1.3] text-3xl font-bold text-center">
					Manage Your AI Advantage
				</h1>
				<p className="text-sm text-white/60 block mt-4">
					Simple pricing for powerful AI agents. Find the perfect fit to grow
					your business.
				</p>
			</div>
			<Suspense fallback={<PricingLoading />}>
				<PricingClient />
			</Suspense>
		</div>
	);
};

export default PricingPage;
