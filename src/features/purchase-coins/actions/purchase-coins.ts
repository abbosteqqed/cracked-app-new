"use server";

import db from "@/lib/db";
import { Checkout } from "@polar-sh/sdk/models/components/checkout.js";
import { coinProducts } from "../constants/coin-products";

export const updatePurchasedCoins = async (data: Checkout) => {
	const product = coinProducts.find(
		(item) => item.productId === data.product.id
	);

	console.log(`Data: ${JSON.stringify(data)}`);

	const user = await db.user.findFirst({
		where: {
			customerId: data.customerId,
		},
	});

	console.log(`User: ${JSON.stringify(user)}`);
	console.log(`Product: ${JSON.stringify(product)}`);

	if (user && data.customerId) {
		const userId = user.id;
		try {
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
		} catch (e) {
			console.log(e);
		}
	}
};
