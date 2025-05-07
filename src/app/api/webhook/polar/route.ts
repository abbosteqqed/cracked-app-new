import db from "@/lib/db";
import { getSubscriptionById } from "@/features/pricing/actions/polar";
import { removeSubscriptionById } from "@/features/pricing/actions/remove-subscription-by-id";
import { updatePurchasedCoins } from "@/features/purchase-coins/actions/purchase-coins";
import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
	webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
	onPayload: async (payload) => {
		const getCredits = (productId: string): number => {
			if (productId === "9ed397a2-98e2-45df-a49c-4a6a46b5dbed") {
				return 2000000;
			}
			if (productId === "1fc7a0ab-7b4f-401f-baca-6a09f7d4231e") {
				return 75000000;
			}
			if (productId === "07acff71-dc51-4bee-9340-6e7bf0186484") {
				return 200;
			}
			if (productId === "67b07ad1-ad75-4e88-aeae-03a7c2778625") {
				return 2000000;
			}
			return 0;
		};
		const { type, data } = payload;

		if (type === "customer.created") {
			const customer = await db.user.findUnique({
				where: {
					email: data.email,
				},
			});

			if (customer) {
				await db.user.update({
					where: {
						id: customer.id,
					},
					data: {
						customerId: data.id,
					},
				});
			}
		}

		if (type === "checkout.created") {
			await db.checkout.create({
				data: {
					id: data.id,
					productId: data.productId,
					status: data.status,
					currency: data.currency,
					amount: data.amount,
					customerId: data.customerId,
					userId: (data.metadata.userId as string | undefined) ?? null,
				},
			});
		} else if (type === "checkout.updated") {
			const existingCheckout = await db.checkout.findUnique({
				where: {
					id: data.id,
				},
			});
			if (data.status === "succeeded") {
				await updatePurchasedCoins(data);
			}
			if (existingCheckout) {
				await db.checkout.update({
					where: {
						id: data.id,
					},
					data: {
						productId: data.productId,
						status: data.status,
						currency: data.currency,
						amount: data.amount,
						customerId: data.customerId,
						userId: (data.metadata.userId as string | undefined) ?? null,
					},
				});
			}
		} else if (type === "subscription.active") {
			const user = await db.user.findFirst({
				where: {
					customerId: data.customerId,
				},
			});
			if (user) {
				const existingSubscription = await db.subscription.findUnique({
					where: {
						userId: user.id,
					},
				});
				if (existingSubscription) {
					if (existingSubscription.polarSubscriptionId) {
						const pols = await getSubscriptionById(
							existingSubscription.polarSubscriptionId
						);
						if (pols) {
							await removeSubscriptionById(pols.id);
						}
					}
					await db.subscription.update({
						where: {
							userId: user.id,
						},
						data: {
							status: "ACTIVE",
							name: data.product.name,
							userId: user.id,
							polarCheckoutId: data.checkoutId,
							polarSubscriptionId: data.id,
							startDate: data.startedAt,
							endDate: data.endsAt,
						},
					});
					await db.user.update({
						where: {
							id: user.id,
						},
						data: {
							credits: {
								upsert: {
									create: {
										totalCredits: getCredits(data.productId),
									},
									update: {
										totalCredits: {
											increment: getCredits(data.productId),
										},
									},
								},
							},
						},
					});
				} else {
					await db.subscription.create({
						data: {
							status: "ACTIVE",
							name: data.product.name,
							userId: user.id,
							polarCheckoutId: data.checkoutId,
							polarSubscriptionId: data.id,
							startDate: data.startedAt,
							endDate: data.endsAt,
						},
					});

					await db.user.update({
						where: {
							id: user.id,
						},
						data: {
							credits: {
								create: {
									totalCredits: getCredits(data.productId),
								},
							},
						},
					});
				}
			}
		} else {
			console.log("Unhandled event:", type);
		}

		
	},
});


