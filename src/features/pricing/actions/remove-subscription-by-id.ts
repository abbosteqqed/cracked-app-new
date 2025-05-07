"use server";

import { polar } from "@/lib/polar";

export const removeSubscriptionById = async (id: string) => {
	try {
		const subscription = await polar.subscriptions.update({
			id,
			subscriptionUpdate: {
				revoke: true,
			},
		});
		return subscription;
	} catch {
		return undefined;
	}
};
