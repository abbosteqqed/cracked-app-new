"use server";
import { Subscription } from "@polar-sh/sdk/models/components/subscription.js";
import db from "../db";

export const subscriptionUpdated = async (data: Subscription) => {
	if (data.status === "active") {
		const user = await db.user.findFirst({
			where: {
				customerId: data.customerId,
			},
		});

		if (user) {
			const subscription = await db.subscription.findUnique({
				where: {
					userId: user.id,
					polarSubscriptionId: data.id,
				},
			});
			if (subscription) {
				await db.subscription.update({
					where: {
						userId: user.id,
						polarSubscriptionId: data.id,
					},
					data: {
						status: "ACTIVE",
					},
				});
			}
		}
	}
	if (data.status === "canceled") {
		const user = await db.user.findFirst({
			where: {
				customerId: data.customerId,
			},
		});
		if (user) {
			const subscription = await db.subscription.findUnique({
				where: {
					userId: user.id,
					polarSubscriptionId: data.id,
				},
			});
			if (subscription) {
				await db.subscription.update({
					where: {
						id: subscription.id,
					},
					data: {
						status: "CANCELED",
					},
				});
			}
		}
	}
};
