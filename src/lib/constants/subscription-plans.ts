import cuid from "cuid";

export interface PricingPlan {
	id: string;
	productId: string;
	priceId: string;
	title: string;
	description: string;
	benefits: string[];
	price: number;
	priceText?: string;
	isPrimary?: boolean;
}

const SUBSCRIPTION_PLANS: PricingPlan[] = [
	{
		id: cuid(),
		productId: "07acff71-dc51-4bee-9340-6e7bf0186484",
		priceId: "5a24a11e-340b-4d4b-a54d-87a75850a48f",
		title: "Free",
		description: "Get started with 1 active agent and 200 credits per month.",
		benefits: ["1 Active Agent", "200 Credits/Month"],
		price: 0,
		priceText: "month",
	},
	{
		id: cuid(),
		productId: "9ed397a2-98e2-45df-a49c-4a6a46b5dbed",
		priceId: "1c85b056-3c1d-4396-9442-525bd3c1a2f0",
		title: "Base",
		description: "Unlimited active agents and 2,000,000 credits per month.",
		benefits: ["Unlimited Active Agents", "2,000,000 Credits/Month"],
		price: 39,
		priceText: "month",
		isPrimary: true,
	},
	{
		id: cuid(),
		productId: "1fc7a0ab-7b4f-401f-baca-6a09f7d4231e",
		priceId: "0ee5ca91-7c6d-446b-be71-19cac61f9c91",
		title: "Insanity",
		description: "Unlimited active agents and 75,000,000 credits per month.",
		benefits: ["Unlimited Active Agents", "75,000,000 Credits/Month"],
		price: 699,
		priceText: "month",
	},
];

export default SUBSCRIPTION_PLANS;
