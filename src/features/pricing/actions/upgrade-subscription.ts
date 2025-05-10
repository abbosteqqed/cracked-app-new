"use server";

import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import db from "@/lib/db";
import { polar } from "@/lib/polar";

export const upgradeSubscription = async (productId: string) => {
	try {
		const res = await getCurrentUser();
		if (!res) {
			throw Error("User not found");
		}

		const user = res.user;

		const subscription = await db.subscription.findUnique({
			where: {
				userId: user.id,
			},
		});

		if (!subscription || !subscription.polarSubscriptionId) {
			const checkout = await polar.checkouts.create({
				products: [productId],
				customerId: user.customerId,
				customerEmail: user.email,
				embedOrigin: process.env.NEXT_PUBLIC_WEBSITE_URL,
				successUrl: process.env.CHECKOUT_SUCCESS_URL!,
			});

			return {
				url: checkout.url,
			};
		}

		const checkout = await polar.checkouts.create({
			products: [productId],
			customerId: user.customerId,
			customerEmail: user.email,
			subscriptionId: subscription.polarSubscriptionId,
			embedOrigin: process.env.NEXT_PUBLIC_WEBSITE_URL,
			successUrl: process.env.CHECKOUT_SUCCESS_URL!,
		});

		return {
			url: checkout.url,
		};
	} catch (e) {
		console.log(e);
		throw e;
	}
};
