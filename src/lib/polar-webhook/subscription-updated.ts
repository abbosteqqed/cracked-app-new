"use server";

import { Subscription } from "@polar-sh/sdk/models/components/subscription.js";
import db from "../db";
import { subscriptionActive } from "./subscription-active";

export const subscriptionUpdated = async (data: Subscription) => {
	if (data.status === "active") {
		const user = await db.user.findFirst({
			where: {
				customerId: data.customerId,
			},
		});

		if (user) {
			await subscriptionActive(data);
		}
	}
};
