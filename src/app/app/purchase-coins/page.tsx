import PricingHeader from "@/components/layout/pricing-header";
import CoinPurchase from "@/features/purchase-coins/components/coin-purchase";
import React from "react";

const PurchaseCoins = async () => {
	return (
		<div className="pt-10 pb-6">
			<PricingHeader
				title="Get More Credits"
				description="Instantly add credits to your account and keep your AI agents running
					smoothly."
			/>
			<CoinPurchase />
		</div>
	);
};

export default PurchaseCoins;
