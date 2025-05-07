import { polar } from "@/lib/polar";

export const getSubscriptionById = async (id: string) => {
	try {
		const subscription = await polar.subscriptions.get({ id });
		return subscription;
	} catch {
		return undefined;
	}
};



export const createCustomerByEmail = async ({
	email,
	userId,
}: {
	email: string;
	userId: string;
}) => {
	try {
		const customer = await polar.customers.create({
			email,
			metadata: {
				userId,
			},
		});
		return customer;
	} catch (e) {
		console.log(e);
		return undefined;
	}
};
