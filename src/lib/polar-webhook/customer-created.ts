"use server"

import { Customer } from "@polar-sh/sdk/models/components/customer.js";
import db from "../db";

export const customerCreated = async (data: Customer) => {
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
};