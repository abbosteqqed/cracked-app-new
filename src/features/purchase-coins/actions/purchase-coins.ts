"use server";

import { polar } from "@/lib/polar";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import { env } from "@/lib/config";

export const purchaseCoins = async ({ id }: { id: string }) => {
	try {
		const user = await getCurrentUser();
		if (!user) {
			return {
				error: "User not found",
			};
		}

		const checkout = await polar.checkouts.create({
			products: [id],
			customerEmail: user.email,
			customerId: user.customerId,
			embedOrigin: env.NEXT_PUBLIC_WEBSITE_URL,
			successUrl: `${env.NEXT_PUBLIC_WEBSITE_URL}/app/confirmation`,
		});

		return {
			url: checkout.url,
		};
	} catch (e) {
		console.log(e);
		return {
			error: "Something went wrongly please check it later.",
		};
	}
};
