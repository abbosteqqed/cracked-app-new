"use server";

import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import { env } from "@/lib/config";
import db from "@/lib/db";
import { polar } from "@/lib/polar";

export const upgradeSubscription = async (productId: string) => {
	try {
		const user = await getCurrentUser();
		if (!user) {
			throw Error("User not found");
		}

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
				embedOrigin: env.NEXT_PUBLIC_WEBSITE_URL,
				successUrl: `${env.NEXT_PUBLIC_WEBSITE_URL}/app/confirmation`,
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
			embedOrigin: env.NEXT_PUBLIC_WEBSITE_URL,
			successUrl: `${env.NEXT_PUBLIC_WEBSITE_URL}/app/confirmation`,
		});

		return {
			url: checkout.url,
		};
	} catch (e) {
		console.log(e);
		throw e;
	}
};
