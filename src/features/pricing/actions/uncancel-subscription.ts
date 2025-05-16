"use server";

import db from "@/lib/db";
import { polar } from "@/lib/polar";
import { getSubscriptionById } from "./polar";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import { revalidatePath } from "next/cache";

export const unCancelPricing = async (pathname: string) => {
	try {
		const user = await getCurrentUser();
		if (!user) {
			throw Error("User not authenticated");
		}
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
			},
		});

		await db.subscription.update({
			where: {
				id: subscription.id,
			},
			data: {
				status: "ACTIVE",
			},
		});

		revalidatePath(pathname);

		return {
			success: "Successfully subscription uncancelled",
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
};
