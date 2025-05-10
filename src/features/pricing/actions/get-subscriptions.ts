"use server";

import { getCurrentUser } from "@/features/auth/actions/get-curent-user";

export const getSubscriptions = async () => {
	try {
		const user = await getCurrentUser();
		return {
			subsription: user?.user.subscription,
		};
	} catch (e) {
		console.log(e);
		throw Error("Something went wrongly in the server please check it later");
	}
};
