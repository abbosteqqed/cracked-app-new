"use server";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { headers as nextHeader } from "next/headers";

export const getCurrentUser = async () => {
	const headers = await nextHeader();
	try {
		// Get session
		const session = await auth.api.getSession({
			headers,
		});

		// If no session, sign out and return null
		if (!session) {
			await auth.api.signOut({
				headers,
			});
			throw Error("User not found!");
		}

		// Fetch user with subscription and credit info
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
						status: true,
						endDate: true,
					},
				},
				credits: {
					select: {
						totalCredits: true,
					},
				},
			},
		});

		// If user not found in DB, sign out and return null
		if (!user) {
			await auth.api.signOut({ headers });
			throw Error("User not found!");
		}

		return user;
	} catch (error) {
		console.error("Error in getCurrentUser:", error);
		throw Error("Something went wrongly");
	}
};
