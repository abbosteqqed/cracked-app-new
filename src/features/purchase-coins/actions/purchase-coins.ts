"use server";





import { polar } from "@/lib/polar";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";

export const purchaseCoins = async ({ id }: { id: string }) => {
	try {
		const data = await getCurrentUser();
		if (!data) {
			return {
				error: "User not found",
			};
		}
		const user = data.user;
		const checkout = await polar.checkouts.create({
			products: [id],
			customerEmail: user.email,
			customerId: user.customerId,
			embedOrigin: process.env.NEXT_PUBLIC_WEBSITE_URL,
			successUrl: process.env.CHECKOUT_SUCCESS_URL!,
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
