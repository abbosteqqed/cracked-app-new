"use server";

import { Checkout } from "@polar-sh/sdk/models/components/checkout.js";
import db from "../db";
import { coinProducts } from "@/features/purchase-coins/constants/coin-products";

export const checkoutUpdated = async (data: Checkout) => {
	const existingCheckout = await db.checkout.findUnique({
		where: {
			id: data.id,
		},
	});
	if (data.status === "succeeded") {
		const product = coinProducts.find(
			(item) => item.productId === data.product.id
		);

		const user = await db.user.findFirst({
			where: {
				customerId: data.customerId,
			},
		});

		if (user && data.customerId) {
			const userId = user.id;

			const existing = await db.purchaseCoinHistory.findUnique({
				where: {
					checkoutId: data.id,
				},
			});

			if (!existing && product && data.status === "succeeded") {
				await db.user.update({
					where: {
						id: userId,
					},
					data: {
						credits: {
							update: {
								totalCredits: {
									increment: product.coins,
								},
							},
						},
					},
				});
			}
			if (data.status === "succeeded") {
				await db.purchaseCoinHistory.create({
					data: {
						pricedId: data.productPriceId,
						productId: data.productId,
						amount: product?.cost,
						userId,
						checkoutId: data.id,
					},
				});
			}
		}
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
};
