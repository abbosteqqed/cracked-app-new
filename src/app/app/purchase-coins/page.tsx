"use client";
import LoadingPage from "@/components/layout/loading-page";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const CoinPurchase = dynamic(
	() => import("@/features/purchase-coins/components/coin-purchase"),
	{ ssr: false }
);
const PurchaseCoins = () => {
	return (
		<Suspense fallback={<LoadingPage message="Purchase coins.." />}>
			<CoinPurchase />
		</Suspense>
	);
};

export default PurchaseCoins;
