"use server";

import db from "@/lib/db";
import { polar } from "@/lib/polar";
import { getSubscriptionById } from "./polar";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";

export const cancelPricing = async () => {
	try {
		const res = await getCurrentUser();
		if (!res) {
			throw Error("User not authenticated");
		}

		const user = res.user;

		const subscription = await db.subscription.findUnique({
			where: {
				userId: user.id,
			},
		});

		if (!subscription || !subscription.polarSubscriptionId) {
			throw Error("Subscription not found");
		}

		const polarSubscription = await getSubscriptionById(
			subscription.polarSubscriptionId
		);

		if (!polarSubscription) {
			throw Error("Subscription not found");
		}

		await polar.subscriptions.update({
			id: subscription.polarSubscriptionId,
			subscriptionUpdate: {
				cancelAtPeriodEnd: true,
			},
		});

		await db.subscription.update({
			where: {
				polarSubscriptionId: subscription.polarSubscriptionId,
				userId: user.id,
			},
			data: {
				status: "CANCELED",
			},
		});

		return {
			success: "Successfully subscription cancelled",
		};
	} catch (error) {
		throw error;
	}
};
