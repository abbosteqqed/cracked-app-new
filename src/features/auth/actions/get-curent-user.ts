"use server";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { headers as NextHeaders } from "next/headers";

export const getCurrentUser = async () => {
	const headers = await NextHeaders();
	const session = await auth.api.getSession({
		headers,
	});
	if (!session) {
		await auth.api.signOut({
			headers,
		});
		return null;
	}
	const user = await db.user.findUnique({
		where: {
			id: session.user.id,
		},
		select: {
			id: true,
			email: true,
			onboarding: true,
			customerId: true,
			subscription: {
				select: {
					name: true,
				},
			},
			credits: {
				select: {
					totalCredits: true,
				},
			},
		},
	});

	if (!user) {
		await auth.api.signOut({
			headers,
		});
		return null;
	}
	return {
		user: user,
	};
};
