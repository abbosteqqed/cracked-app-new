"use server";

import { Checkout } from "@polar-sh/sdk/models/components/checkout.js";
import db from "../db";

export const checkoutCreated = async (data: Checkout) => {
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
};
