"use client";
import dynamic from "next/dynamic";
import React from "react";

const CoinPurchase = dynamic(
	() => import("@/features/purchase-coins/components/coin-purchase"),
	{ ssr: false }
);
const PurchaseCoins = () => {
	return <CoinPurchase />;
};

export default PurchaseCoins;
