import React, { lazy } from "react";

const CoinPurchase = lazy(
	() => import("@/features/purchase-coins/components/coin-purchase")
);

const PurchaseCoins = async () => {
	return <CoinPurchase />;
};

export default PurchaseCoins;
