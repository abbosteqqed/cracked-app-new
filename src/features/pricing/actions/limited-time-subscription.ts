"use server";
import { polar } from "@/lib/polar";
import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import { createCustomerByEmail } from "./polar";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import { env } from "@/lib/config";

interface LimitedTimeSubscription {
	plan: string;
}

export const limitedTimeSubscription = async ({
	plan = "free",
}: LimitedTimeSubscription) => {
	if (plan === "free") {
		return await freePlanSubscription();
	}
	if (plan === "base") {
		return await limitedBasePlanSubscription();
	}
	return {
		error: "Plan not found!",
	};
};

// Free Plan Subscription
const freePlanSubscription = async () => {
	try {
		const user = await getCurrentUser();
		if (!user) {
			return { error: "User not authenticated." };
		}

		if (!user.customerId) {
			const customer = await createCustomerByEmail({
				email: user.email,
				userId: user.id,
			});
			if (customer) {
				await db.user.update({
					where: {
						id: user.id,
					},
					data: {
						customerId: customer.id,
					},
				});
				const checkoutSession = await polar.checkouts.create({
					customerId: customer.id,
					customerEmail: customer.email,
					products: ["07acff71-dc51-4bee-9340-6e7bf0186484"],
					embedOrigin: env.NEXT_PUBLIC_WEBSITE_URL,
					successUrl: `${env.NEXT_PUBLIC_WEBSITE_URL}/app/confirmation`,
					allowDiscountCodes: false,
					metadata: {
						userId: user.id,
					},
				});
				return {
					url: checkoutSession.url,
				};
			}
			return {
				error: "Something went wrongly in creating customer",
			};
		}

		const checkoutSession = await polar.checkouts.create({
			customerId: user.customerId,
			customerEmail: user.email,
			products: ["07acff71-dc51-4bee-9340-6e7bf0186484"],
			successUrl: `${env.NEXT_PUBLIC_WEBSITE_URL}/app/confirmation`,
			embedOrigin: env.NEXT_PUBLIC_WEBSITE_URL,
			allowDiscountCodes: false,
			metadata: {
				userId: user.id,
			},
		});

		revalidatePath("/app");
		return {
			url: checkoutSession.url,
		};
	} catch (e) {
		console.log(e);
		return {
			error: "Something went wrongly please check it again later.",
		};
	}
};

// Limited Base Plan Subscription
const limitedBasePlanSubscription = async () => {
	try {
		const user = await getCurrentUser();
		if (!user) {
			return { error: "User not authenticated." };
		}

		if (!user.customerId) {
			const customer = await createCustomerByEmail({
				email: user.email,
				userId: user.id,
			});
			if (customer) {
				await db.user.update({
					where: {
						id: user.id,
					},
					data: {
						customerId: customer.id,
					},
				});
				const checkoutSession = await polar.checkouts.create({
					customerId: customer.id,
					customerEmail: customer.email,
					discountId: "ff97279c-ef8d-47ef-b2ff-4b36551fd12e",
					products: ["9ed397a2-98e2-45df-a49c-4a6a46b5dbed"],
					embedOrigin: env.NEXT_PUBLIC_WEBSITE_URL,
					successUrl: `${env.NEXT_PUBLIC_WEBSITE_URL}/app/confirmation`,
					allowDiscountCodes: false,
					metadata: {
						userId: user.id,
					},
				});
				return {
					url: checkoutSession.url,
				};
			}
			return {
				error: "Something went wrongly in creating customer",
			};
		}

		const checkoutSession = await polar.checkouts.create({
			customerId: user.customerId,
			customerEmail: user.email,
			discountId: "ff97279c-ef8d-47ef-b2ff-4b36551fd12e",
			products: ["9ed397a2-98e2-45df-a49c-4a6a46b5dbed"],
			successUrl: `${env.NEXT_PUBLIC_WEBSITE_URL}/app/confirmation`,
			embedOrigin: env.NEXT_PUBLIC_WEBSITE_URL,
			allowDiscountCodes: false,
			metadata: {
				userId: user.id,
			},
		});

		return {
			url: checkoutSession.url,
		};
	} catch (e) {
		console.log(e);
		return {
			error: "Something went wrongly please check it again later.",
		};
	}
};
