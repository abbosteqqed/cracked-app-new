"use server";

import db from "@/lib/db";
import { polar } from "@/lib/polar";
import { getSubscriptionById } from "./polar";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import { revalidatePath } from "next/cache";

export const cancelPricing = async (pathname: string) => {
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

		const polarSubscription = await getSubscriptionById(
			subscription.polarSubscriptionId
		);

		if (!polarSubscription) {
			throw Error("Subscription not found");
		}

		const res = await polar.subscriptions.update({
			id: subscription.polarSubscriptionId,
			subscriptionUpdate: {
				cancelAtPeriodEnd: true,
			},
		});

		await db.subscription.update({
			where: {
				id: subscription.id,
			},
			data: {
				status: "CANCELED",
				endDate: res.endsAt,
				renewalDate: null,
			},
		});

		revalidatePath(pathname);

		return {
			success: "Successfully subscription cancelled",
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
};
