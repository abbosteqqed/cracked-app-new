export interface PricingPlansDTO {
	productId: string;
	priceId: string;
	name: string;
	features: string[];
	description: string;
}

export const pricingPlas: PricingPlansDTO[] = [
	{
		productId: "prod_SGA5SOTuECGhQr",
		priceId: "price_1RLdkwEPmrG32a9eLKFYWL3V",
		name: "Free",
		description: "Get started with 1 active agent and 200 credits per month.",
		features: ["1 Active Agent", "200 Credits/Month"],
	},
	{
		productId: "prod_SGA5SOTuECGhQr",
		priceId: "price_1RLdkwEPmrG32a9eLKFYWL3V",
		name: "Free",
		description: "Get started with 1 active agent and 200 credits per month.",
		features: ["1 Active Agent", "200 Credits/Month"],
	},
];
