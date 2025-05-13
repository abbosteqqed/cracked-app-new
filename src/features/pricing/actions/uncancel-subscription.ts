"use server";

import db from "@/lib/db";
import { polar } from "@/lib/polar";
import { getSubscriptionById } from "./polar";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";

export const unCancelPricing = async () => {
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

		const subscriptionId = subscription.polarSubscriptionId;

		const polarSubscription = await getSubscriptionById(
			subscription.polarSubscriptionId
		);

		if (!polarSubscription) {
			throw Error("Subscription not found");
		}

		await polar.subscriptions.update({
			id: subscriptionId,
			subscriptionUpdate: {
				cancelAtPeriodEnd: false,
				revoke: undefined,
			},
		});

		await db.subscription.update({
			where: {
				polarSubscriptionId: subscriptionId,
				userId: user.id,
			},
			data: {
				status: "ACTIVE",
			},
		});

		return {
			success: "Successfully subscription uncancelled",
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
};
